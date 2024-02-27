import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize, DataTypes} from "sequelize";
import { UserModel } from "./model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DecodeToken, checkToken } from "./middlewares/checkToken";

const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:1437',
  changeOrigin: true,
  logger: console
});

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const User = UserModel(sequelize);

sequelize.sync({ force: true });
// sequelize.sync();

const app = express();
app.use(cors());
//app.use(bodyParser.json());

app.post('/api/voitures', apiProxy)
app.get('/api/voitures', apiProxy)
app.all('/api/voitures/:id', apiProxy)

app.use(bodyParser.json());

app.post("/api/auth/register", async (req, res) => {
  console.log('post a user');
  
  // const { nom, email, mdp } = req.body.data;
  const nom = req.body.nom;
  const email = req.body.email;
  const mdp = req.body.mdp;
  const userEmail = await User.findOne({ where: {email:email}});

  if (userEmail===null) {
    if(!nom || !email || !mdp){
      res.status(400).send("Missing required information");
    }
    else {
      const saltRounds = 10;
      const hash = await bcrypt.hash(mdp, saltRounds);
      const newUser = await User.create({ nom, email, mdp:hash });
      const newUserData = newUser.dataValues
      delete newUserData.mdp
      const tokenJWT = jwt.sign({ data: 'foobar'}, 'secret', { expiresIn: '1h' });
        res.status(200).send(tokenJWT);
    }
  }
  else {
    res.status(400).send("l'email que vous avez saisi est déjà utilisé");
  }
});

app.post("/api/auth", async (req, res) => {
  console.log('post a connexion');
  
  const { email, mdp } = req.body;
  if(!email || !mdp){
      res.status(400).send("Missing required information");
  }
  else {
      const userEmail = await User.findOne({ where: { email: email} });
      if (userEmail!==null) {
        const userEmailData = userEmail.dataValues;
        const match = await bcrypt.compare(mdp, userEmailData.mdp);
        if(!match) {
          res.status(400).send("le mot de passe n'est pas le bon");
        }
        else {
          const tokenJWT = jwt.sign(userEmailData, process.env.JWT_SECRET!, { expiresIn: '1h' });
          res.status(200).send(tokenJWT);
        }
      }
      else {
        res.status(400).send("l'email saisi n'est pas le bon");
      }
  }
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).send(JSON.stringify(allUsers));
})

app.get("/me", checkToken, async (req, res) => {
  const decoded = jwt.decode(req.token!) as DecodeToken
  const user = await User.findOne({ where: { id: decoded.id } });
  if (user) {
      delete user.dataValues.password;
      res.json(user);
  }
  else {
      res.status(404).send("User not found");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
