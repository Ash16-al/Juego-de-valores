class StartScreen extends HTMLElement {
  connectedCallback() {
    const personaje = localStorage.getItem("personajeSeleccionado");
    let personajeHTML = "";

    if (personaje === "niño") {
      personajeHTML = `
        <div class="flex flex-col items-center">
          <img src="img/image-removebg-preview (1).png" alt="Niño pixelado" class="w-32 h-auto animate-bounce" />
          <p class="mt-2 text-2xl font-semibold text-green-200">Elegiste: Niño</p>
        </div>
      `;
    } else if (personaje === "niña") {
      personajeHTML = `
        <div class="flex flex-col items-center">
          <img src="img/image-removebg-preview (2).png" alt="Niña pixelada" class="w-32 h-auto animate-bounce" />
          <p class="mt-2 text-2xl font-semibold text-green-200">Elegiste: Niña</p>
        </div>
      `;
    }

    this.innerHTML = `
      <style>
        @keyframes fondoAnimado {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .fondo-dinamico {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          padding: 3rem 6rem;
          color: white;
          font-family: Arial, sans-serif;
          text-align: center;
          position: relative;
          overflow: hidden;

          background: linear-gradient(135deg, #1e5631, #4caf50, #a8e6cf, #2e7d32);
          background-size: 400% 400%;
          animation: fondoAnimado 15s ease infinite;
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

        /* Botón Empezar Juego con degradado verde */
        #empezarBtn {
          background: linear-gradient(90deg, #4caf50, #2e7d32);
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
          padding: 1rem 2rem;
          border-radius: 1rem;
          border: none;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          transition: all 0.3s ease;
        }

        #empezarBtn:hover {
          background: linear-gradient(90deg, #71db88, #1e5631);
          transform: scale(1.05);
        }
      </style>

      <div id="intro" class="h-screen fondo-dinamico">
        ${this.decoraciones()}
        <div class="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-8 text-center">
          <h1 class="text-6xl font-extrabold drop-shadow-lg leading-tight">🎮 ¡Ups, Teacher!</h1>
          <p class="text-2xl font-medium max-w-2xl">Mandaste el mensaje equivocado al Teacher Walter... ¿cómo vas a arreglarlo? Tomá decisiones y descubrí tu final. 😱📱</p>
          <div id="personajes" class="mt-6">${personajeHTML}</div>
          <button id="empezarBtn">Empezar Juego</button>
        </div>
      </div>
    `;

    this.querySelector("#empezarBtn").addEventListener("click", () => {
      document.body.innerHTML = "";
      const paso1 = document.createElement("es-uno-dos");
      document.body.appendChild(paso1);
    });
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

customElements.define('inicio-juego', StartScreen);
