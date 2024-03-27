import { app } from "./app";
import { env } from "./env";

app.listen(
  {
    port: env.PORT,
    host: "0.0.0.0",
  },
  (_err, address) => {
    console.log(`🚀 API RESTFUL running on: ${address}`);
  }
);
