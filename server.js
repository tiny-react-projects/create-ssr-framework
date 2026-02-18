const express = require("express");
const path = require("path");
const render = require("./dist/server.bundle.js").default;
const app = express();

app.use("/dist", express.static(path.resolve(__dirname, "dist")));
app.get("/", (req, res) => {
  const appHtml = render();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log("🚀 http://localhost:3000");
});
