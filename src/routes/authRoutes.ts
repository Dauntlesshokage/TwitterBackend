import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;

function generateEmailToken(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
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
            create: { email, name, username },
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
export default router;
