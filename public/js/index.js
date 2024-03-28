$(function () {
  const elementoInput = $("#input_url");
  const botonSubmit = $("#btn_enviar_url");
  const loader = $("#loader");
  const botonLimpiar = $("#btn_limpiar");

  $("#formulario_ingresa_imagen").on("submit", function (event) {
    event.preventDefault();

    const inputValue = elementoInput.val();
    const imageRegex =
      /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%\._\+~#\?&\/=\-\(\)\w]*\.(jpg|jpeg|png|gif|webp)\??(([\w\-]+=[\w\-]*)&?)*$/;

    if (imageRegex.test(inputValue) === false) {
      alert("Por favor ingresa una URL de imagen válida");
    } else {
      const params = new URLSearchParams();

      params.append("imagen", inputValue);
      const url = this.action + "?" + params.toString();
      botonSubmit.attr("disabled", true);
      botonSubmit.html("Servidor Ocupado.....");
      loader.show();
      botonLimpiar.attr("disabled", true);
      fetch(url)
        .then((response) => response.json())
        .catch(function () {
          window.location.href = "/muestra_imagen?imagen=error_url";
        })
        .then(function (data) {
          if (data.error) {
            window.location.href =
              "/muestra_imagen?imagen=error_servidor&error=" + data.error;
          } else {
            window.location.href = "/muestra_imagen?imagen=" + data.imagen;
            botonSubmit.attr("disabled", false);
            botonLimpiar.attr("disabled", false);
            botonSubmit.html("Subir Imagen al Servidor");
            loader.hide();
          }
        });
    }
  });

  botonLimpiar.on("click", function () {
    elementoInput.val("");
  });

  $("#btn_volver_al_inicio").on("click", function () {
    window.location.href = "/";
  });
});
