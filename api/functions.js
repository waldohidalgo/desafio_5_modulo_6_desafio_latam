const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");
function generarID() {
  return uuidv4().slice(0, 6);
}
function validarURL(url) {
  const imageRegex =
    /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%\._\+~#\?&\/=\-\(\)\w]*\.(jpg|jpeg|png|gif|webp)\??(([\w\-]+=[\w\-]*)&?)*$/;
  return imageRegex.test(url);
}
async function procesaImagen(req, res) {
  const { imagen: imagenURL } = req.query;

  if (validarURL(imagenURL)) {
    try {
      const imagenJimp = await Jimp.read(imagenURL);
      const nombreImagen = `img${generarID()}.jpg`;
      const rutaImagenServer = path.join(
        __dirname,
        "..",
        "images",
        nombreImagen,
      );
      const objeto = await imagenJimp
        .resize(350, Jimp.AUTO)
        .grayscale()
        .writeAsync(rutaImagenServer);

      res.status(200).render("imagen_formateada", {
        imagen: `./images/${nombreImagen}`,
      });
    } catch (err) {
      res.status(500).render("error_servidor", { error: err.message });
    }
  } else {
    res.status(400).render("url_invalida");
  }
}

function eliminarArchivosDeCarpeta() {
  const carpeta = path.join(__dirname, "..", "images");
  fs.readdir(carpeta, (err, archivos) => {
    if (err) {
      console.error("Error al leer el directorio:", err);
      return;
    }

    archivos.forEach((archivo) => {
      const rutaArchivo = path.join(carpeta, archivo);

      fs.unlink(rutaArchivo, (err) => {
        if (err) {
          console.error("Error al eliminar el archivo:", err);
        } else {
          console.log("Archivo eliminado:", rutaArchivo);
        }
      });
    });
  });
}

setInterval(eliminarArchivosDeCarpeta, 5 * 60 * 1000);

eliminarArchivosDeCarpeta();

module.exports = { procesaImagen };
