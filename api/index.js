const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const PORT = 3000;
const rutas = require("./routes");
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
  }),
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/", rutas);
app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

module.exports = app;
