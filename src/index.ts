import dotenv from "dotenv";
import { usdBrlWorker } from "./workers/UsdBrlWorker";

class Main {
  constructor() {
    dotenv.config();
  }

  public start() {
    usdBrlWorker.run(
      Number.parseInt(process.env.USD_BRL_WORKER_DELAY_SECONDS as string)
    );
  }
}

new Main().start();
