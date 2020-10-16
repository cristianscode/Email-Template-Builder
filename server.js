const express = require("express");
const app = express();
app.use(express.static("./dist/Email-Template-Builder"));
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: "dist/Email-Template-Builder/" });
});
app.listen(process.env.PORT || 8080);
