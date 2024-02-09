import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import appointmentController from "./6-controllers/appointment-controller";
import appointmentTypeController from "./6-controllers/appointment-type-controller";

const server = express();

server.use(cors());
server.use(express.json())
server.use("/api", authController);
server.use("/api", appointmentController);
server.use("/api", appointmentTypeController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

