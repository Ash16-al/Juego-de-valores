class StartScreen extends HTMLElement {
  connectedCallback() {
    const personaje = localStorage.getItem("personajeSeleccionado");
    let personajeHTML = "";
 
    if (personaje === "niño") {
      personajeHTML = `
        <div class="flex flex-col items-center">
          <img src="img/image-removebg-preview (1).png" alt="Niño pixelado" class="w-32 h-auto animate-bounce" />
          <p class="mt-2 text-2xl font-semibold text-blue-300">Elegiste: Niño</p>
        </div>
      `;
    } else if (personaje === "niña") {
<<<<<<< HEAD
      personajeHTML = `
=======
        personajeHTML = `
>>>>>>> cf5c7c41c905e0cebf501b32b722621eeec22c11
        <div class="flex flex-col items-center">
          <img src="img/image-removebg-preview (2).png" alt="Niña pixelada" class="w-32 h-auto animate-bounce" />
          <p class="mt-2 text-2xl font-semibold text-pink-300">Elegiste: Niña</p>
        </div>
      `;
    }
 
    this.innerHTML = `
<<<<<<< HEAD
      <div class="h-screen bg-gradient-to-br from-blue-900 to-indigo-800 text-white flex flex-col items-center justify-center gap-10 text-center px-6">
        <div class="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-8 text-center">
          <h1 class="text-6xl font-extrabold drop-shadow-lg leading-tight">🎮 ¡Ups, Teacher!</h1>
          <p class="text-2xl font-medium max-w-2xl">Mandaste el mensaje equivocado al Teacher Walter... ¿cómo vas a arreglarlo? Tomá decisiones y descubrí tu final. 😱📱</p>
          <div id="personajes" class="mt-6">${personajeHTML}</div>
          <button id="empezarBtn" class="bg-white text-blue-800 font-bold text-xl px-8 py-4 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 shadow-lg">
            Empezar Juego
          </button>
=======
    <style>
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
    </style>

    <div id="intro" class="h-screen fondo-dinamico text-white flex flex-col items-center justify-center gap-10 text-center px-6">
        ${this.decoraciones()}
        <div class="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-8 text-center">
        <h1 class="text-6xl font-extrabold drop-shadow-lg leading-tight">🎮 ¡Ups, Teacher!</h1>
        <p class="text-2xl font-medium max-w-2xl">Mandaste el mensaje equivocado al Teacher Walter... ¿cómo vas a arreglarlo? Tomá decisiones y descubrí tu final. 😱📱</p>

        <div id="personajes" class="mt-6">
            ${personajeHTML}
        </div>

        <button id="empezarBtn" class="bg-white text-blue-800 font-bold text-xl px-8 py-4 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 shadow-lg">
        Empezar Juego
        </button>
>>>>>>> cf5c7c41c905e0cebf501b32b722621eeec22c11
        </div>
      </div>
    `;
 
    this.querySelector("#empezarBtn").addEventListener("click", () => {
      document.body.innerHTML = "";
      const paso1 = document.createElement("es-uno-dos");
      document.body.appendChild(paso1);
    });
  }
}
<<<<<<< HEAD
customElements.define('inicio-juego', StartScreen);
=======

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

customElements.define('inicio-juego', StartScreen);
>>>>>>> cf5c7c41c905e0cebf501b32b722621eeec22c11
