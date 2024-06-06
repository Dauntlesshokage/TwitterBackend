import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const allUser = await prisma.user.findMany();
  res.json(allUser);
  // res.status(501).json({ error: "Not implememented" });
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { tweets: true },
  });
  res.json(user); // res.status(501).json({ error: `Not implemented : ${id}` });
});

router.post("/", async (req, res) => {
  const { email, name, username } = req.body;
  // console.log(email, name, username);
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "Active",
      },
    });
    res.json(result);
    // res.status(501).json({ error: "Not implemented" });
  } catch (e) {
    res.status(400).json({ error: "Username and email must be unique" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name, image } = req.body;
  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: { bio, name, image },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: `Failed to update user : ${id}` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;
