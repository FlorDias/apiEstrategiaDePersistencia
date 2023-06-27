const selectCarrera = document.getElementById("carrera_id");

fetch("http://localhost:3001/car")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error en la solicitud AJAX");
    }
  })
  .then((data) => {
    for (let i = 0; i < data.rows.length; i++) {
      const option = document.createElement("option");
      option.value = data.rows[i].id;
      option.textContent = data.rows[i].nombre;
      selectCarrera?.appendChild(option);
    }
  })
  .catch((error) => {
    console.error(error);
  });