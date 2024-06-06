import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import { PrismaClient } from "@prisma/client/extension";

const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);

app.get("/", (req, res) => {
  res.status(501).json({ error: "Not implememented" });
});

app.listen(3000, () => {
  console.log("server ready at localhost:3000");
});
