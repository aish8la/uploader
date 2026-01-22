import "./configs/env.js";
import path from "node:path";
import express from "express";
import { sessionMiddleware } from "./configs/session.js";
import passport from "passport";
import { fileURLToPath } from "node:url";
import { localStrategy } from "./configs/passport.js";
import router from "./routes/main.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

passport.use(localStrategy);
app.use(sessionMiddleware);
app.use(passport.session());
app.use(router);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server");
    return;
  }
  console.log(`Server listening on port ${PORT}`);
});
