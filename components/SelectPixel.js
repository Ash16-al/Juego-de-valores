class SelectPixel extends HTMLElement {
connectedCallback() {
    this.innerHTML = `
    <style>
        .fade-out {
            animation: fadeOut 0.5s ease forwards;
        }

        @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
            }
        }

        h1, h2 {
            font-size: 3rem;
        }

        p {
            font-size: 1.5rem;
        }

        button {
            font-size: 1.25rem;
        }
    </style>

    <div id="intro" class="h-screen bg-gradient-to-br from-blue-900 to-indigo-800 text-white flex flex-col items-center justify-center gap-10 text-center px-6">
        <h1 class="font-bold animate-pulse">🎮 ¡Bienvenido al mundo pixelado!</h1>
        <p class="max-w-2xl leading-relaxed">Prepárate para una aventura visual llena de color, personajes únicos y desafíos divertidos. Elegí tu compañero de viaje y comenzá la historia.</p>
        <button id="comenzarBtn" class="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105">
        Comenzar
        </button>
    </div>

    <div id="seleccion" class="h-screen bg-gradient-to-br from-blue-950 to-blue-800 text-white flex flex-col items-center justify-center gap-10 hidden">
        <h2 class="text-5xl font-bold">🕹️ Elegí tu personaje</h2>
        <div class="flex gap-16">
            ${this.crearBoton("niño", "img/image-removebg-preview (1).png", "bg-cyan-500", "w-44")}
            ${this.crearBoton("niña", "img/image-removebg-preview (2).png", "bg-purple-400", "w-44")}
        </div>
    </div>

    `;

    this.querySelector("#comenzarBtn").addEventListener("click", () => {
        const intro = this.querySelector("#intro");
        const seleccion = this.querySelector("#seleccion");

        intro.classList.add("fade-out");
        setTimeout(() => {
        intro.style.display = "none";
        seleccion.classList.remove("hidden");
    }, 500);
    });
}

    crearBoton(nombre, imagen, color) {
    return `
    <div class="flex flex-col items-center bg-white bg-opacity-90 p-6 rounded-xl shadow-md hover:scale-105 transition w-56">
        <img src="${imagen}" alt="${nombre}" class="w-[180px] h-auto mb-4" />
        <button class="${color} text-white px-5 py-3 rounded-lg font-semibold" onclick="seleccionarPersonaje('${nombre}')">
        Elegir
        </button>
    </div>
    `;
}
}

customElements.define('select-character', SelectPixel);
