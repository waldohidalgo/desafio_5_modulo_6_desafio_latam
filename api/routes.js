const express = require("express");
const router = express.Router();
const path = require("path");

const { procesaImagen, muestraImagen } = require("./functions");
router.use(
  "/bootstrap_css",
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "css"),
  ),
);

router.use(
  "/bootstrap_js",
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "js"),
  ),
);
router.use(
  "/jquery",
  express.static(path.join(__dirname, "..", "node_modules", "jquery", "dist")),
);
router.use("/public", express.static(path.join(__dirname, "..", "public")));
router.use("/images", express.static(path.join(__dirname, "..", "images")));
router.get("/", (req, res) => {
  res.render("inicio");
});

router.get("/procesa_imagen", procesaImagen);
router.get("/muestra_imagen", muestraImagen);

router.get("/*", (req, res) => {
  res.render("url_invalida");
});

module.exports = router;
