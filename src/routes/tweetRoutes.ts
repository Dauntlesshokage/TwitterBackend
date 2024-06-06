import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const result = await prisma.tweet.findMany({
    include: {
      user: {
        select: {
          name: true,
          username: true,
          id: true,
          image: true,
        },
      },
    },
  });
  res.json(result);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await prisma.tweet.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  if (!tweet) {
    res.status(400).json({ error: `Tweet not found: ${id}` });
  }
  res.json(tweet);
});

router.post("/", async (req, res) => {
  const { content, image, userId } = req.body;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        image,
        userId,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "Tweet could not be made" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, image } = req.body;
  try {
    const result = await prisma.tweet.update({
      where: { id: Number(id) },
      data: {
        content,
        image,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: `Cannot edit tweet with ID : ${id}` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;
