import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticateToken } from "./mddleware/authMiddleware";

const app = express();
app.use(express.json());
app.use("/user", authenticateToken, userRoutes);
app.use("/tweet", authenticateToken, tweetRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(501).json({ error: "Not implememented" });
});

app.listen(3000, () => {
  console.log("server ready at localhost:3000");
});
