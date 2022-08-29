// under src directory
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/oauth/google", "/oauth/notion"],
    createProxyMiddleware({
      target: "http://localhost:3000",
    })
  );
};
