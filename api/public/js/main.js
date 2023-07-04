const selectCarrera = document.getElementById("carrera_id");

fetch("http://localhost:3001/car")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error en la solicitud");
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

const logout = () => {
  fetch("http://localhost:3001/logout", { method: "POST" }).then((data) => {
    window.location.href = "/login";
    console.log(data);
  });
};


document.addEventListener("DOMContentLoaded", () => {

  const username = document.getElementById("username")?.innerText;

 
  fetch(`http://localhost:3001/usu?username=${username}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
 
    })
    .catch(error => console.error("Error al obtener los usuarios:", error));
});
