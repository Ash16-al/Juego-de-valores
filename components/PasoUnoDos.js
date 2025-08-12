class PasoUnoDos extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          padding: 2.5rem 6rem;
          color: white;
          overflow: hidden;
          position: relative;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        .decorativo {
          position: absolute;
          opacity: 0.6;
          animation: flotar 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes flotar {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        .opcion-btn {
          background-color: #4f46e5;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: bold;
          transition: all 0.3s ease;
          cursor: pointer;
          user-select: none;
          border: none;
          color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          z-index: 10;
          max-width: 100%;
          white-space: normal;
        }
        .opcion-btn:hover:not(.disabled) {
          background-color: #6366f1;
          transform: scale(1.05);
        }
        .disabled {
          pointer-events: none;
          opacity: 0.5;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        #vidas {
          font-size: 2.5rem;
          font-weight: 700;
          user-select: none;
          z-index: 10;
          text-shadow: 0 0 8px rgba(255,0,0,0.7);
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        h2 {
          text-shadow: 0 0 6px rgba(0,0,0,0.7);
          margin-bottom: 1rem;
        }
        p {
          min-height: 1.5em;
          margin-top: 1rem;
          padding: 0.4rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
          word-break: break-word;
          background-color: rgba(0, 0, 0, 0.25);
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .correcto {
          background-color: #22c55e88;
          color: #166534;
          border: 1.5px solid #16a34a;
          box-shadow: 0 0 8px #22c55eaa;
        }
        .error {
          background-color: #7c3aed66;
          color: #ede9fe;
          border: 1.5px solid #5b21b6;
          box-shadow: 0 0 8px #7c3aedaa;
        }
        #fin {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #a78bfa;
          font-size: 3rem;
          font-weight: 900;
          text-align: center;
          text-shadow: 0 0 15px #a78bfaaa;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.7s ease;
          z-index: 50;
          background: rgba(67, 56, 202, 0.85);
          padding: 1.25rem 2.5rem;
          border-radius: 1rem;
          user-select: none;
          letter-spacing: 1px;
          max-width: 90vw;
          word-break: break-word;
        }
        #fin.visible {
          opacity: 1;
          pointer-events: auto;
        }
        #imagen {
          width: 18rem;
          height: auto;
          border-radius: 0.5rem;
          margin-top: 1rem;
          box-shadow: 0 0 15px rgba(0,0,0,0.5);
          z-index: 10;
        }
      </style>
      <div class="hidden" id="cuestionario">
      <div class="fondo-dinamico hidden" id="fondo">
        <div id="decoraciones"></div>

        <div id="vidas" aria-live="polite" aria-atomic="true">❤️❤️❤️</div>

        <div id="paso1" class="animate-fadeIn" style="z-index:10;">
          <h2>🧩 PASO 1 – RECONOCER EL PROBLEMA</h2>
          <p>¿Cuál es el problema?</p>
          <div style="display:flex; flex-direction: column; gap: 1rem; max-width: 850px; margin: 0 auto;">
            <button onclick="validarPaso1('A')" class="opcion-btn mala">A. Teacher Walter es muy exigente</button>
            <button onclick="validarPaso1('B')" class="opcion-btn">B. Mandaste un mensaje irrespetuoso al teacher</button>
            <button onclick="validarPaso1('C')" class="opcion-btn mala">C. El grupo de WhatsApp confunde</button>
          </div>
          <p id="feedback1" aria-live="polite"></p>
        </div>

        <div id="paso2" class="hidden animate-fadeIn" style="z-index:10;">
          <h2>🧩 PASO 2 – ANALIZAR EL PROBLEMA</h2>
          <p>¿Qué puede pasar?</p>
          <div style="display:flex; flex-direction: column; gap: 1rem; max-width: 850px; margin: 0 auto;">
            <button onclick="validarPaso2('A')" class="opcion-btn mala">A. Teacher Walter lo toma como broma</button>
            <button onclick="validarPaso2('B')" class="opcion-btn">B. Podés perder puntos o recibir un llamado de atención</button>
            <button onclick="validarPaso2('C')" class="opcion-btn mala">C. Te toca hablar con Coordinación</button>
          </div>
          <p id="feedback2" aria-live="polite"></p>
        </div>

        <div id="paso3" class="hidden animate-fadeIn" style="z-index:10;">
          <h2>🧩 PASO 3 – CONSIDERAR METAS</h2>
          <p>¿Qué quieres lograr?</p>
          <div style="display:flex; flex-direction: column; gap: 1rem; max-width: 850px; margin: 0 auto;">
            <button onclick="validarPaso3('A')" class="opcion-btn">A. Que no pase a más.</button>
            <button onclick="validarPaso3('B')" class="opcion-btn mala">B. Que teacher Walter entienda tu punto.</button>
            <button onclick="validarPaso3('C')" class="opcion-btn mala">C. Que nadie se entere jamás.</button>
          </div>
          <p id="feedback3" aria-live="polite"></p>
        </div>

        <div id="paso4" class="hidden animate-fadeIn" style="z-index:10;">
          <h2>🧩 PASO 4 – BUSCAR ALTERNATIVAS</h2>
          <p>¿Qué hacés ahora?</p>
          <div style="display:flex; flex-direction: column; gap: 1rem; max-width: 850px; margin: 0 auto;">
            <button onclick="validarPaso4('A')" class="opcion-btn mala">A. Borrás el mensaje y hacés como si nada</button>
            <button onclick="validarPaso4('C')" class="opcion-btn mala">B. Mandás un sticker gracioso que diga "ja ja es broma"</button>
            <button onclick="validarPaso4('B')" class="opcion-btn">C. Le escribís una disculpa</button>
          </div>
          <p id="feedback4" aria-live="polite"></p>
          <div class="flex justify-center items-center pb-30">
           <img id="imagen" alt="Imagen de feedback" class="hidden justify-center block w-40 h-50" />
           <button id="end" class="hidden opcion-btn">Finalizar aventura</button>
          </div>
         
        </div>
        </div>

        <p id="fin"></p>
      </div>
      <!--Parte de la reflexión-->
      <!-- Pantalla 1 -->
      <div id="pantalla1" class="pantalla hidden flex flex-col justify-center items-center h-screen bg-blue-950 text-white text-center space-y-6">
        <h1 class="text-6xl font-bold">🌟FELICIDADES LLEGASTE AL FINAL🌟</h1>
        <button id="result" class="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg  transition duration-300 shadow-lg">
          Ver resultados
        </button>
      </div>

      <!-- Pantalla 2 -->
      <div id="pantalla2" class="pantalla hidden flex-col justify-center items-center h-screen bg-blue-800 text-white text-center space-y-6">
        <h2 class="text-4xl font-bold">- REFLEXIONA -</h2>
        <p class="text-xl">¿Qué aprendiste de esta experiencia?</p>
        <div class="bg-blue-900 border-2 border-white rounded-xl p-6 max-w-3xl font-semibold text-lg space-y-4">
          <p>✅ "Un error no define quién eres, pero tu valentía para admitirlo y repararlo sí"</p>
          <p>
            Aceptar nuestros errores es reconocer que no somos perfectos, pero sí capaces de mejorar.<br>
            Es entender que cada fallo es una lección disfrazada de tropiezo.<br>
            Es dejar el orgullo a un lado para darle paso a la humildad y al aprendizaje.<br>
            Porque solo quien asume su responsabilidad puede crecer de verdad.
          </p>
        </div>
        <div class="flex space-x-4 mt-6">
          <button id="screen3" class="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg transition duration-300 shadow-lg">
            Siguiente
          </button>
        </div>
      </div>

      <!-- Pantalla 3 -->
      <div id="pantalla3" class="pantalla hidden flex-col justify-center items-center h-screen bg-blue-900 text-white text-center space-y-5">
        <h2 class="text-4xl font-bold"> - TOMA DECISIONES -</h2>
        <p class="text-xl">¿Qué harías la próxima vez?</p>
        <ul class="text-lg text-3xl font-bold space-y-2">
          <li>A. Ignorar el problema</li>
          <li>B. Hacerte la victima</li>
          <li>C. Pedir disculpas sinceras</li>
          <li>😃Quien asume su responsabilidad, conquista el respeto de los demás y la paz consigo mismo.😃</li>
        </ul>
        <button id="screen4" class="mt-6 bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg transition duration-300 shadow-lg">
          Siguiente
        </button>
      </div>

      <!-- Pantalla 4 -->
      <div id="pantalla4" class="pantalla hidden h-screen text-black">
        <div class="flex h-full items-center justify-center">
          <img src="Img/Niña sonrriente.png" alt="Imagen izquierda" class="h-[80vh] object-cover rounded-xl shadow-xl mx-4" />
          <div class="text-center max-w-xl px-6">
            <h2 class="text-4xl font-bold mb-4">🎉 "¡Recuerda!" 🎉</h2>
            <p class="text-lg text-3xl font-bold">🌟Si alguna vez te equivocas, no pierdas tiempo buscando culpables ni excusas. Mira de frente tu error, reconoce el daño y repara lo que esté en tus manos.
Pedir perdón no disminuye tu valor, lo engrandece🌟</p>
            <button id="screen5" class="mt-6 bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg transition duration-300 shadow-lg">
              Siguiente
            </button>
          </div>
          <img src="Img/Niño sonrriente.png" alt="Imagen derecha" class="h-[80vh] object-cover rounded-xl shadow-xl mx-4" />
        </div>
      </div>

      <!-- Pantalla 5 -->
      <div id="pantalla5" class="pantalla hidden h-screen bg-white relative overflow-hidden flex items-center justify-center">
        <div class="flex flex-col items-center justify-center z-10 text-center space-y-6">
          <h2 class="text-4xl font-bold">🎈 ¡MUCHAS 🌟FELICIDADES SUPERASTE ESTE RETO! 🎈</h2>
          <button id="main" class="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg transition duration-300 shadow-lg">
            Volver al inicio
          </button>
        </div>
      </div>
    `;

    const componente = this;
    let vidas = 3;
    const fin = this.querySelector('#fin');
    const vidasElemento = this.querySelector('#vidas');
    const cuestio = this.querySelector('#cuestionario').classList.remove('hidden')
    // Decoraciones
    function decoracionesPixeladas() {
      const cantidad = 15;
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
        decorativos += `<img src="${img}" class="decorativo" style="top:${top}; left:${left}; width:${size}px;" alt="Decoración pixelada" />`;
      }
      return decorativos;
    }
    this.querySelector('#decoraciones').innerHTML = decoracionesPixeladas();

    function actualizarVidas() {
      vidasElemento.innerHTML = '❤️'.repeat(vidas);
      vidasElemento.classList.add('animate-pulse');
      setTimeout(() => vidasElemento.classList.remove('animate-pulse'), 500);
    }

    function limpiarFeedback() {
      for (let i = 1; i <= 4; i++) {
        const fb = componente.querySelector(`#feedback${i}`);
        if (fb) {
          fb.textContent = '';
          fb.classList.remove('correcto', 'error');
        }
      }
      const imagen = componente.querySelector('#imagen');
      if (imagen) {
        imagen.classList.add('hidden');
        imagen.src = '';
      }
    }

    function bloquearBotones() {
      const botones = componente.querySelectorAll('button.opcion-btn');
      botones.forEach(btn => btn.classList.add('disabled'));
    }

    function desbloquearBotones() {
      const botones = componente.querySelectorAll('button.opcion-btn');
      botones.forEach(btn => btn.classList.remove('disabled'));
    }

    actualizarVidas();

    window.validarPaso1 = function(opcion) {
      if (vidas <= 0) return;
      const feedback = componente.querySelector("#feedback1");
      limpiarFeedback();
      if (opcion === 'B') {
        feedback.textContent = "✅ Reconocés el problema. ¡Ahora a ver cómo lo solucionás!";
        feedback.classList.add('correcto');
        setTimeout(() => {
          componente.querySelector("#paso1").classList.add("hidden");
          componente.querySelector("#paso2").classList.remove("hidden");
          limpiarFeedback();
        }, 1500);
      } else {
        vidas--;
        actualizarVidas();
        feedback.textContent = "❌ Esa no es la mejor respuesta. Pensalo bien.";
        feedback.classList.add('error');
        chequearGameOver();
      }
    };

    window.validarPaso2 = function(opcion) {
      if (vidas <= 0) return;
      const feedback = componente.querySelector("#feedback2");
      limpiarFeedback();
      if (opcion === 'B') {
        feedback.textContent = "✅ Es posible que tengas consecuencias, pero todo depende de cómo respondas.";
        feedback.classList.add('correcto');
        setTimeout(() => {
          componente.querySelector('#paso2').classList.add('hidden');
          componente.querySelector('#paso3').classList.remove('hidden');
          limpiarFeedback();
        }, 1500);
      } else {
        vidas--;
        actualizarVidas();
        feedback.textContent = "❌ No es la mejor opción. Pensalo de nuevo.";
        feedback.classList.add('error');
        chequearGameOver();
      }
    };

    window.validarPaso3 = function(opcion) {
      if (vidas <= 0) return;
      const feedback = componente.querySelector('#feedback3');
      limpiarFeedback();
      if (opcion === 'A') {
        feedback.textContent = '✅ Buena decisión, buscar resolver con madurez.';
        feedback.classList.add('correcto');
        setTimeout(() => {
          componente.querySelector('#paso3').classList.add('hidden');
          componente.querySelector('#paso4').classList.remove('hidden');
          limpiarFeedback();
        }, 1500);
      } else {
        vidas--;
        actualizarVidas();
        feedback.textContent = "❌ No es la mejor opción. Pensalo de nuevo.";
        feedback.classList.add('error');
        chequearGameOver();
      }
    };

    window.validarPaso4 = function(opcion) {
      if (vidas <= 0) return;
      const feedback = componente.querySelector('#feedback4');
      const imagen = componente.querySelector('#imagen');
      const boton = componente.querySelector('#end')
      limpiarFeedback();
      if (opcion === 'B') {
        feedback.textContent = '✅ RUTA B – PEDIR DISCULPAS';
        feedback.classList.add('correcto');
        imagen.src = '/img/ChatGPT Image 9 ago 2025, 19_22_48.png';
        imagen.classList.remove('hidden');
        boton.classList.remove('hidden')
      } else if (opcion === 'A') {
        feedback.textContent = 'Lo eliminás rápido. Pero 🔔 "Teacher Walter ha leído tu mensaje"';
        feedback.classList.add('error');
        imagen.src = '/img/ChatGPT Image 9 ago 2025, 18_31_33.png';
        imagen.classList.remove('hidden');
        boton.classList.remove('hidden')
      } else {
        feedback.textContent = '🔀 RUTA C – USAR STICKER GRACIOSO';
        feedback.classList.add('error');
        imagen.src = '/img/ChatGPT Image 9 ago 2025, 19_27_56.png';
        imagen.classList.remove('hidden');
        boton.classList.remove('hidden')
      }
    };

    function chequearGameOver() {
      if (vidas <= 0) {
        bloquearBotones();
        fin.textContent = '💀 GAME OVER – Tendrás que volver a intentarlo';
        fin.classList.add('visible');
        setTimeout(() => {
          fin.classList.remove('visible');
          vidas = 3;
          actualizarVidas();
          limpiarFeedback();
          desbloquearBotones();
          // Reset pasos
          for (let i = 1; i <= 4; i++) {
            const paso = componente.querySelector('#paso' + i);
            if (paso) paso.classList.add('hidden');
          }
          const paso1 = componente.querySelector('#paso1');
          if (paso1) paso1.classList.remove('hidden');
        }, 4000);
      }
    }
    const boton = this.querySelector('#end')
    boton.addEventListener('click',() =>{
      const página = this.querySelector('#pantalla1')
      página.classList.remove('hidden')
      const cuesi = this.querySelector('#cuestionario')
      cuesi.classList.add('hidden')
    })
    const uno = this.querySelector('#result')
    const dos = this.querySelector('#screen3')
    const tres=  this.querySelector('#screen4')
    const cuatro = this.querySelector('#screen5')
    const main = this.querySelector('#main')      

    uno.addEventListener('click',() => {
      const pant = this.querySelector('#pantalla2')
      const panta = this.querySelector('#pantalla1')
      pant.classList.remove('hidden')
      panta.classList.add('hidden')
    })
    dos.addEventListener('click',() => {
      const pant = this.querySelector('#pantalla3')
       const panta = this.querySelector('#pantalla2')
      pant.classList.remove('hidden')
      panta.classList.add('hidden')
    })
    tres.addEventListener('click',() => {
      const pant = this.querySelector('#pantalla4')
       const panta = this.querySelector('#pantalla3')
       pant.classList.remove('hidden')
      panta.classList.add('hidden')
    })
    cuatro.addEventListener('click',() => {
      const pant = this.querySelector('#pantalla5')
      const panta = this.querySelector('#pantalla4')
      pant.classList.remove('hidden')
      panta.classList.add('hidden')
    })

    main.addEventListener('click',()=>{
      location.reload();
    })
    


  }
}

customElements.define('es-uno-dos', PasoUnoDos);
