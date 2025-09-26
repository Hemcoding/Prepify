import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import xss from "xss";
import userRouter from "./routes/User.route.js"
import sessionRouter from "./routes/Session.route.js"
import questionRouter from "./routes/Question.route.js"
import aiRouter from "./routes/Ai.route.js"
// import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();

// app.use(xss());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "5mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// app.use(ExpressMongoSanitize());


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again after an hour",
});
app.use("/tawk", limiter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/sessions", sessionRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/ai", aiRouter);

export { app };
