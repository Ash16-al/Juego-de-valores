class StartScreen extends HTMLElement {
connectedCallback() {
    const personaje = localStorage.getItem("personajeSeleccionado");

    let personajeHTML = "";
    if (personaje === "niño") {
    personajeHTML = `
        <div class="flex flex-col items-center">
            <img src="img/image-removebg-preview (1).png" alt="Niño pixelado" class="w-20 h-auto animate-bounce" />
            <p class="mt-1 text-xl font-semibold text-blue-300">Elegiste: Niño</p>
        </div>
    `;
    } else if (personaje === "niña") {
    personajeHTML = `
        <div class="flex flex-col items-center">
            <img src="img/image-removebg-preview (2).png" alt="Niña pixelada" class="w-20 h-auto animate-bounce" />
            <p class="mt-1 text-xl font-semibold text-pink-300">Elegiste: Niña</p>
        </div>
    `;
    }

    this.innerHTML = `
        <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 text-white flex flex-col items-center justify-center px-6 py-12">

        <!-- Fondo decorativo pixelado -->
        <div class="absolute inset-0 z-0 pointer-events-none">
            <img src="./img/Gemini_Generated_Image_nbjwcqnbjwcqnbjw.png" 
            class="w-full h-full object-cover opacity-20" 
            style="image-rendering: pixelated;" 
            alt="Fondo decorativo">
        </div>

        <!-- Contenido principal -->
        <div class="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-6 text-center">
            <h1 class="text-5xl font-extrabold drop-shadow-lg">🎮 ¡Ups, Profe!</h1>
            <p class="text-lg font-medium">Mandaste el mensaje equivocado al Teacher Walter... ¿cómo vas a arreglarlo? Tomá decisiones y descubrí tu final. 😱📱</p>

            <!-- Personaje elegido -->
            <div id="personajes" class="mt-4">
            ${personajeHTML}
        </div>

        <!-- Botón para empezar -->
            <button id="empezarBtn" class="bg-white text-blue-800 font-bold px-6 py-3 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 shadow-lg">
            Empezar Juego
            </button>
        </div>
    </div>
    `;

    this.querySelector("#empezarBtn").addEventListener("click", () => {
        document.body.innerHTML = "";
        const paso3 = document.createElement("es-tres");
        document.body.appendChild(paso3);
    });
}
}

customElements.define('inicio-juego', StartScreen);
