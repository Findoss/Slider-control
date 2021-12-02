/**
 * @format
 */

const express = require("express");
const helmet = require("helmet");
const genKey = require("./utils");
const store = require("./store");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable("x-powered-by");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.post("/start", (req, res) => {
  const { body } = req;

  store.removeById(body.id);

  const key = genKey();

  store.add({
    key,
    ...body,
  });

  res.json({ key: key });
});

app.post("/update", (req, res) => {
  const { body } = req;

  console.log(body);
  res.json({});
});

app.listen(5010);

console.log(`start ${5010} port`);
