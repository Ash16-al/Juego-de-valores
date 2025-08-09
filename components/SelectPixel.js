class SelectPixel extends HTMLElement {
connectedCallback() {
    this.innerHTML = `
    <style>
      /* Fondo animado */
        @keyframes fondoAnimado {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .fondo-dinamico {
        background: linear-gradient(-45deg, #1e3a8a, #3b82f6, #6366f1, #1e40af);
        background-size: 400% 400%;
        animation: fondoAnimado 15s ease infinite;
        position: relative;
        overflow: hidden;
    }   

      /* Decoraciones flotantes */
        @keyframes flotar {
        0% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0); }
    }

    .decorativo {
        position: absolute;
        height: auto;
        opacity: 0.6;
        animation: flotar 6s ease-in-out infinite;
        pointer-events: none;
        z-index: 0;
    }

      /* Transiciones */
        .fade-out {
        animation: fadeOut 0.5s ease forwards;
    }

        @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }

    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

      /* Botones y personajes */
        .personaje:hover {
        animation: rebote 0.4s ease;
    }

    @keyframes rebote {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    </style>

    <!-- Pantalla de bienvenida -->
    <div id="intro" class="h-screen fondo-dinamico text-white flex flex-col items-center justify-center gap-10 text-center px-6 fade-in">
        ${this.decoraciones()}
        <h1 class="font-bold text-5xl animate-pulse z-10">🎮 ¡Bienvenido al mundo pixelado!</h1>
        <p class="max-w-2xl text-xl leading-relaxed z-10">Prepárate para una aventura visual llena de color, personajes únicos y desafíos divertidos. Elegí tu compañero de viaje y comenzá la historia.</p>
    <button id="comenzarBtn" class="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105 z-10">
        Comenzar
    </button>
    </div>

    <!-- Pantalla de selección -->
    <div id="seleccion" class="h-screen fondo-dinamico text-white flex flex-col items-center justify-center gap-10 hidden fade-in">
        ${this.decoraciones()}
        <h2 class="text-5xl font-bold z-10">🕹️ Elegí tu personaje</h2>
        <div class="flex gap-16 z-10">
            ${this.crearBoton("niño", "img/image-removebg-preview (1).png", "bg-cyan-500")}
            ${this.crearBoton("niña", "img/image-removebg-preview (2).png", "bg-purple-400")}
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
        seleccion.classList.add("fade-in");
    }, 500);
    });
}

    crearBoton(nombre, imagen, color) {
    return `
    <div class="personaje flex flex-col items-center bg-white bg-opacity-90 p-6 rounded-xl shadow-md transition w-56">
        <img src="${imagen}" alt="${nombre}" class="w-[180px] h-auto mb-4" />
        <button class="${color} text-white px-5 py-3 rounded-lg font-semibold" onclick="seleccionarPersonaje('${nombre}')">
        Elegir
        </button>
    </div>
    `;
}

    decoraciones() {
    const cantidad = 20;
    const imagenes = [
        "img/image-removebg-preview (3).png",
        "img/image-removebg-preview (4).png",
        "img/image-removebg-preview (5).png"
    ];

    let decorativos = "";

    for (let i = 0; i < cantidad; i++) {
        const img = imagenes[i % imagenes.length];
        const top = Math.floor(Math.random() * 90) + "%";
        const left = Math.floor(Math.random() * 90) + "%";
        const size = Math.floor(Math.random() * 40) + 30;

    decorativos += `
        <img src="${img}" class="decorativo" style="top:${top}; left:${left}; width:${size}px;" alt="Decoración pixelada" />
    `;
    }

    return decorativos;
}
}

customElements.define('select-character', SelectPixel);
