import Bunyan from "bunyan";

import config from "../config";

const logger = new Bunyan({
  name: "booking",
  serializers: Bunyan.stdSerializers,
  streams: [
    {
      level: config.env === "development" ? "debug" : "info",
      stream: process.stdout,
    },
  ],
});

export default logger
