$(function () {
  const elementoInput = $("#input_url");
  const botonSubmit = $("#btn_enviar_url");
  const loader = $("#loader");
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
      $("#btn_limpiar").attr("disabled", true);
      window.location.href = url;
    }
  });

  $("#btn_limpiar").on("click", function () {
    elementoInput.val("");
  });
});
