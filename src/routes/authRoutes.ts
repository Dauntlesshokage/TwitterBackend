import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = "SECRET";

function generateEmailToken(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId };
  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

router.post("/login", async (req, res) => {
  const { email, name, username } = req.body;
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
  );
  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },
            create: { email },
          },
        },
      },
    });
    console.log(createdToken);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "couldnt start authentication" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, emailToken, valid } = req.body;
  let dbEmailToken = await prisma.token.findUnique({
    where: { emailToken },
    include: { user: true },
  });
  if (dbEmailToken && dbEmailToken.expiration < new Date()) {
    dbEmailToken = await prisma.token.update({
      where: { id: dbEmailToken.id },
      data: {
        valid: false,
      },
      include: { user: true },
    });
  }
  console.log(dbEmailToken);
  if (!dbEmailToken || dbEmailToken.valid === false) {
    return res.sendStatus(401);
  }
  if (dbEmailToken?.user?.email != email) {
    return res.sendStatus(401);
  }
  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );
  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });
  await prisma.token.update({
    where: { id: dbEmailToken.id },
    data: { valid: false },
  });
  const authToken = generateAuthToken(apiToken.id);
  res.json({ authToken });
  //   res.sendStatus(200);
});
export default router;
