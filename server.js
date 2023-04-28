const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.NODE_ENV || 3000;
const hostname = "localhost";
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    //apply proxy in dev mode
    if (dev) {
      server.use(
        "/api",
        createProxyMiddleware({
          // target: "http://localhost:8000",
          target: "https://backendapi.gracebusinessservices.co.uk",
          changeOrigin: true,
        })
      );
    }

    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log("> SERVER IS READY");
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
