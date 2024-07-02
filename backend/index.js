import express from "express";
import paginate from "express-paginate";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import TransactionsRoute from "./routes/TransactionRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync({ alter: true });
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(paginate.middleware(10, 50));
app.use(UserRoute);
app.use(TransactionsRoute);
app.use(AuthRoute);

store.sync({ alter: true });

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
