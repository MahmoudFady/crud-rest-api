import express from "express";
import cors from "cors";
import notFoundMw from "./middlewares/not-found.mw";
import errorMw from "./middlewares/error.mw";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(notFoundMw);
app.use(errorMw);
export default app;
