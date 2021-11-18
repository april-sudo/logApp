import connectWebSocket from "./wss.js";
import makeConnStream from "./watch.js";
import express from "express";
import path from "path";

// const express = require("express");
// const path = require("path");
const app = express();
const port = 8080;
const __dirname = path.resolve();

app.get("/", (req, res) => {
  //response.send("this is log tailing application");
  res.sendFile(path.join(__dirname, "/welcome.html"));
});

app.get("/ws", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
  connectWebSocket(makeConnStream);
});

app.listen(port, () => {
  console.log("example web app start at localhost");
});
