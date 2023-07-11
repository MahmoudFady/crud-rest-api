import { createLogger, transports } from "winston";
import path from "path";
import expressWinston from "express-winston";
const logger = createLogger({
  level: "info",
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../../logs", "logfile.log"),
    }),
    new transports.File({
      level: "error",
      filename: path.join(__dirname, "../../../logs", "errlogfile.log"),
    }),
  ],
});

const loggingMw = (level: string) =>
  expressWinston.logger({
    level,
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  });

export default loggingMw;
