import { createLogger, transports } from "winston";
import expressWinston from "express-winston";
const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logfile.log" }),
  ],
});
const loggingMw = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
});

export default loggingMw;
