class StartScreen extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 text-white flex flex-col items-center justify-center px-6 py-12">

            <!-- Fondo decorativo -->
            <div class="absolute inset-0 z-0 pointer-events-none">
                <img src="./img/Gemini_Generated_Image_nbjwcqnbjwcqnbjw.png" 
                    class="w-full h-full object-cover opacity-20" 
                    alt="Fondo decorativo">
            </div>

            <!-- Contenido principal -->
            <div class="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-6 text-center">
                <h1 class="text-5xl font-extrabold drop-shadow-lg">🎮 ¡Ups, Profe!</h1>
                <p class="text-lg font-medium">Mandaste el mensaje equivocado al Teacher Walter... ¿cómo vas a arreglarlo? Tomá decisiones y descubrí tu final. 😱📱</p>
                
                <!-- Aquí se insertan los personajes -->
                <div id="personajes" class="mt-4"></div>

                <!-- Botón para empezar -->
                <button id="empezarBtn" class="bg-white text-blue-800 font-bold px-6 py-3 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 shadow-lg">
                    Empezar Juego
                </button>
            </div>
        </div>
        `;

        // Insertar personajes dentro del contenedor
        const personajes = document.createElement("pixel-kids");
        this.querySelector("#personajes").appendChild(personajes);

        // Flujo al iniciar el juego
        this.querySelector("#empezarBtn").addEventListener("click", () => {
            document.body.innerHTML = ""; // Limpia la pantalla
            const paso3 = document.createElement("es-tres");
            document.body.appendChild(paso3);
        });
    }
}

customElements.define('inicio-juego', StartScreen);
