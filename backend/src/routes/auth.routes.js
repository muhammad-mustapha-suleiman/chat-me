import express from "express";
import { signUp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signUp);

router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

export default router;
