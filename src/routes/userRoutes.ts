import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(501).json({ error: "Not implememented" });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not implemented : ${id}` });
});

router.post("/", (req, res) => {
  res.status(501).json({ error: "Not implemented" });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not implemented : ${id}` });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not implemented : ${id}` });
});

export default router;
