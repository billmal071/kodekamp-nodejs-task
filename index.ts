import express from "express";
import { cpus } from "os";
import cluster from "cluster";
import cors from "cors";
import helmet from "helmet";
require("dotenv").config();
require("tsconfig-paths/register");
import connect from "@db/db";
connect();
const totalCpus = cpus().length;
import router from "@routes/index.route";

if (cluster.isPrimary) {
  console.log(`total number of cpus is ${totalCpus}`);
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(router);

  app.get("/", (req: express.Request, res: express.Response) => {
    res.send(`
    <h1>Routes</h1>
    <ul>
      <li>GET /info?pages=1&pageSize=10</li>
      <li>GET /info/:id</li>
      <li>POST /info</li>
      <li>PUT /info/:id</li>
      <li>PATCH /info/:id</li>
      <li>DELETE /info/:id</li>
    </ul>
    `);
  });
  const PORT = process.env.PORT ?? 5000;
  app.listen(PORT, () => console.log(`running on port:${PORT}`));
}
