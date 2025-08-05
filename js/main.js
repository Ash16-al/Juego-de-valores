function seleccionarPersonaje(personaje) {
localStorage.setItem("personajeSeleccionado", personaje);

document.body.classList.add("fade-out");

setTimeout(() => {
    document.body.innerHTML = "";
    document.body.classList.remove("fade-out");
    document.body.appendChild(document.createElement("inicio-juego"));
}, 500);
}
