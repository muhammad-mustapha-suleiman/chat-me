import express from "express";

const router = express.Router();

router.get("/send", (req, res)=>{
    res.send("Hello from send messages");
});

export default router;