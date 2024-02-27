import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize, DataTypes} from "sequelize";

import { VoitureModel } from "./model/Voiture";

import { voitureRouter } from "./router/voiture";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Voiture = VoitureModel(sequelize);

sequelize.sync({ force: true });
// sequelize.sync();

const app = express();
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/voitures', voitureRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
