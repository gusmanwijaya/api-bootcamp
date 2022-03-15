const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");

const authParticipantRouter = require("./app/api/v1/auth/participant/router");
const authUserRouter = require("./app/api/v1/auth/user/router");

const categoryRouter = require("./app/api/v1/cms/category/router");
const userRouter = require("./app/api/v1/cms/user/router");

const { handleError } = require("./app/errors");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const apiVersion = "/api/v1";

app.use(`${apiVersion}/auth/participant`, authParticipantRouter);
app.use(`${apiVersion}/auth/user`, authUserRouter);

app.use(`${apiVersion}/category`, categoryRouter);
app.use(`${apiVersion}/user`, userRouter);

app.use(handleError);

module.exports = app;
