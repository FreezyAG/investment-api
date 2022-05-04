/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import path from "path";
import express from "express";
import dotEnv from 'dotenv';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

/* ---------------------------- internal imports ---------------------------- */
import logger from "./utils/logger";
import config from "./config";
import cors from "./middleware/utils";
import ErrorHandler from "./middleware/error-handler";

dotEnv.config({ path: path.resolve(path.dirname(__filename), './config/.env') })

import controller from './controllers';

var app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/best_investment_dates', controller.getBestInvestmentDates);
app.use(controller.routeNotFound);

app.use(ErrorHandler);

const port = config.server.port
app.listen(port, () => logger.info(`server connected at port: ${port}`));
