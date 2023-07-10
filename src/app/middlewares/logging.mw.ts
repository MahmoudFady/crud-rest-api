import { createLogger, transports } from "winston";
import path from "path";
import expressWinston from "express-winston";
const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../../logs", "logfile.log"),
    }),
  ],
});
const loggingMw = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
});

export default loggingMw;
