import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";

import apiRouter from "./apiRouter.ts";

dotenv.config();

const port = parseInt(process.env.POST || '3000');

const app = express();
app.use(express.json());

app.use("/api", apiRouter);



ViteExpress.listen(app, port, () =>
  console.log(`Server listening at http://localhost:${port}`),
);
