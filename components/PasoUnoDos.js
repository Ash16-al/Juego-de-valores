class PasoUnoDos extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* =================== ESTILOS DEL JUEGO =================== */
        
        .fondo-dinamico {
          background-image: url('img/fondo..png'); 
          background-size: cover;          
          background-repeat: no-repeat;    
          background-position: center;
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          padding: 3rem 6rem;
          color: white;
          overflow: visible;
          position: relative;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        .fondo-color {
        background: linear-gradient(135deg, #1e5631, #4caf50, #a8e6cf, #2e7d32);
        background-size: 400% 400%;
        animation: fondoAnimado 15s ease infinite;
        position: relative;
        overflow: hidden;
      }

        .fondo-dinamico::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(70, 70, 70, 0.4), rgba(70, 70, 70, 0.4));
          z-index: 5;
          pointer-events: none;
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
          background-color: #2e7d32; /* Verde que combina con la temática */
          padding: 1.25rem 2.5rem; 
          border-radius: 0.75rem; 
          font-weight: bold; 
          font-size: 1.5rem; 
          transition: all 0.3s ease; 
          cursor: pointer; 
          user-select: none; 
          border: none; 
          color: white; 
          box-shadow: 0 5px 10px rgba(0,0,0,0.3); 
          z-index: 10; 
          max-width: 100%; 
          white-space: normal;
        }

        .opcion-btn:hover:not(.disabled) {
          background-color: #71db88ff;
          transform: scale(1.05);
        }

        .disabled { pointer-events: none; opacity: 0.5; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        #titulo { background-color: #2b312dff }
        #vidas {
          font-size: 3rem; 
          font-weight: 700; 
          user-select: none; 
          z-index: 10; 
          text-shadow: 0 0 5px #ff0000,
                       0 0 10px #dd4545ff,
                       0 0 15px #d63a3aff,
                       0 0 20px #ff0000; 
          animation: pulse 1s infinite; 
        }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

        h2 { font-size: 2.5rem; text-shadow: 0 0 8px rgba(0,0,0,0.7); margin-bottom: 1rem; }
        p { font-size: 1.5rem; min-height: 2em; margin-top: 1rem; padding: 0.5rem 1.5rem; border-radius: 0.5rem; font-weight: 600; max-width: 900px; margin-left: auto; margin-right: auto; word-break: break-word; background-color: rgba(0, 0, 0, 0.25); box-shadow: 0 0 10px rgba(0,0,0,0.3); }
        .correcto { background-color: #22c55e88; color: #166534; border: 2px solid #16a34a; box-shadow: 0 0 10px #22c55eaa; }
        .error { background-color: #7c3aed66; color: #ede9fe; border: 2px solid #5b21b6; box-shadow: 0 0 10px #7c3aedaa; }

        #fin {
          position: fixed; 
          top: 50%; left: 50%; 
          transform: translate(-50%, -50%); 
          color: #a78bfa; 
          font-size: 3rem; 
          font-weight: 900; 
          text-align: center; 
          text-shadow: 0 0 15px #a78bfaaa; 
          opacity: 0; pointer-events: none; 
          transition: opacity 0.7s ease; 
          z-index: 50; 
          background: rgba(67, 56, 202, 0.85); 
          padding: 1.5rem 3rem; 
          border-radius: 1rem; 
          user-select: none; 
          letter-spacing: 1px; 
          max-width: 90vw; 
          word-break: break-word; 
        }

        #fin.visible { opacity: 1; pointer-events: auto; }
        #imagen { width: 24rem; height: auto; border-radius: 0.5rem; margin-top: 1rem; box-shadow: 0 0 15px rgba(0,0,0,0.5); z-index: 10; display:none; }

        /* =================== ESTILOS REFLEXIÓN =================== */
        .hidden { display: none; }
        .pantalla { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; padding: 2rem; gap: 1.5rem; }
        .btn-reflexion { background: linear-gradient(90deg,#4f46e5,#3b82f6,#6366f1); color:white; font-weight:bold; padding:1rem 2rem; border-radius:0.75rem; font-size:1.25rem; cursor:pointer; transition: all 0.3s ease; box-shadow:0 5px 10px rgba(0,0,0,0.3); }
        .btn-reflexion:hover { transform: scale(1.05); background: linear-gradient(90deg,#6366f1,#3b82f6,#4f46e5); }
        .reflexion-contenedor { background: rgba(0,0,0,0.25); padding:2rem; border-radius:1rem; max-width:900px; box-shadow:0 0 15px rgba(0,0,0,0.3); }
        .reflexion-img { width: 20rem; max-width: 80vw; border-radius:0.75rem; box-shadow:0 0 15px rgba(95, 94, 94, 0.5); }
      </style>

  <!-- =================== JUEGO =================== -->
  <div id="cuestionario">
    <div class="fondo-dinamico" id="fondo">
      <div id="decoraciones"></div>
      <div id="vidas" aria-live="polite" aria-atomic="true">❤️❤️❤️</div>

      ${[1,2,3,4,5,6,7,8,9,10].map(paso => `
        <div id="paso${paso}" class="${paso===1?'animate-fadeIn':'hidden animate-fadeIn '}" style="z-index:10;">
        <div class="border-10 border-green-500 rounded-xl p-6 bg-[url('/img/fondo.webp')] backdrop-blur-md">
          <h2 id="titulo">🧩 PASO ${paso} – ${
            ["RECONOCER EL PROBLEMA","ANALIZAR EL PROBLEMA","CONSIDERAR METAS","BUSCAR ALTERNATIVAS","EVALUAR CONSECUENCIAS","ELEGIR ACCIÓN","PEDIR AYUDA","RESOLVER CONFLICTOS","APRENDER DE LA EXPERIENCIA","CERRAR LA SITUACIÓN"][paso-1]
          }</h2>
          <p>${
            ["¿Cuál es el problema?","¿Qué puede pasar?","¿Qué quieres lograr?","¿Qué hacés ahora?","¿Qué puede suceder si no actúas?","¿Cómo reaccionás ahora?","¿A quién podés recurrir para mejorar la situación?","¿Qué actitud es la más adecuada al explicar tu error?","¿Qué deberías recordar para la próxima?","¿Cómo terminás la aventura?"][paso-1]
          }</p>
          <div style="display:flex; flex-direction: column; gap: 1.5rem; max-width: 850px; margin: 0 auto;">
            ${
              [
                ["A. Teacher Walter es muy exigente","B. Mandaste un mensaje irrespetuoso al teacher","C. El grupo de WhatsApp confunde"],
                ["A. Teacher Walter lo toma como broma","B. Podés perder puntos o recibir un llamado de atención","C. Te toca hablar con Coordinación"],
                ["A. Que no pase a más.","B. Que teacher Walter entienda tu punto.","C. Que nadie se entere jamás."],
                ["A. Borrás el mensaje y hacés como si nada","B. Le escribís una disculpa","C. Mandás un sticker gracioso que diga 'ja ja es broma'"],
                ["A. Teacher Walter se enoja y afecta tu nota","B. Todo se olvida sin problemas","C. El grupo se vuelve más divertido"],
                ["A. Ignorar el mensaje","B. Pedir disculpas de manera respetuosa","C. Mandar un mensaje confuso para evitar problemas"],
                ["A. A un amigo para que haga la disculpa","B. A un adulto de confianza para pedir consejo","C. Al grupo de WhatsApp para que te apoyen"],
                ["A. Ser honesto y responsable","B. Justificarte con excusas","C. Ignorar el problema y esperar que pase"],
                ["A. Revisar los mensajes antes de enviarlos","B. Evitar contacto con el profesor","C. Pedir ayuda siempre"],
                ["A. Con una disculpa y compromiso de mejorar","B. Con un mensaje gracioso que intente arreglar todo","C. Ignorando la situación"]
              ][paso-1].map((opcion,i)=>{
                const letra = ["A","B","C"][i];
                return `<button onclick="validarPaso${paso}('${letra}')" class="opcion-btn ${["B","B","A","B","A","B","B","A","A","A"][paso-1]!==letra?'mala':''}">${opcion}</button>`;
              }).join('')
            }
          </div>
          </div>
          ${paso===4?`<img id="imagen" src="" alt="Paso 4 imagen" class="ml-60">`:``}
          <p id="feedback${paso}" aria-live="polite"></p>
          ${paso===10?`<div class="flex justify-center items-center pb-10" style="z-index:20;">
            <button id="end" class="opcion-btn hidden mt-4">Finalizar aventura</button>
          </div>`:""}
        </div>
      `).join('')}

      <p id="fin"></p>
    </div>
  </div>

  <!-- =================== REFLEXIÓN =================== -->
<div id="reflexion" class="hidden flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 gap-6 text-center fondo-color">

  <h1 class="text-6xl font-bold drop-shadow-lg rounded-xl p-6 bg-[url('/img/fondo.webp')] bg-cover bg-center backdrop-blur-md">
    🌟FELICIDADES LLEGASTE AL FINAL🌟
  </h1>

  <p class="text-xl">¡Gran trabajo completando todos los pasos!</p>

  <h2 class="text-4xl font-bold drop-shadow-md">- REFLEXIONA -</h2>
  <p class="text-lg max-w-2xl">
    ✅ "Un error no define quién eres, pero tu valentía para admitirlo y repararlo sí"<br>
    Aceptar nuestros errores es reconocer que no somos perfectos, pero sí capaces de mejorar.<br>
    Es entender que cada fallo es una lección disfrazada de tropiezo.<br>
    Es dejar el orgullo a un lado para darle paso a la humildad y al aprendizaje.<br>
    Porque solo quien asume su responsabilidad puede crecer de verdad.
  </p>

  <h2 class="text-4xl font-bold drop-shadow-md mt-6">- TOMA DECISIONES -</h2>
  <p class="text-xl">¿Qué harías la próxima vez?</p>
  <ul class="text-lg font-bold list-disc list-inside mt-4 max-w-xl">
    <li>A. Ignorar el problema</li>
    <li>B. Hacerte la víctima</li>
    <li>C. Pedir disculpas sinceras</li>
    <li>😃Quien asume su responsabilidad, conquista el respeto de los demás y la paz consigo mismo.😃</li>
  </ul>

  <div class="flex flex-col md:flex-row items-center justify-center gap-6 mt-6">
    <img src="img/ninasonriente.png" alt="Imagen izquierda" class="w-40 h-40 object-contain" />
    <div class="text-center md:text-left max-w-xl">
      <h2 class="text-4xl font-bold mb-4 drop-shadow-md">🎉 "¡Recuerda!" 🎉</h2>
      <p class="text-lg font-semibold leading-relaxed">
        🌟Si alguna vez te equivocas, no pierdas tiempo buscando culpables ni excusas. Mira de frente tu error, reconoce el daño y repara lo que esté en tus manos.<br>
        Pedir perdón no disminuye tu valor, lo engrandece🌟
      </p>
    </div>
    <img src="Img/ninosonriente.png" alt="Imagen derecha" class="w-40 h-40 object-contain" />
  </div>

  <h2 class="text-4xl font-bold drop-shadow-md mt-6">🎈 ¡MUCHAS 🌟FELICIDADES SUPERASTE ESTE RETO! 🎈</h2>
  <p class="text-lg mb-6">Gracias por participar y reflexionar sobre tus acciones.</p>

  <button class="btn-reflexion px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
    Volver al inicio
  </button>
</div>


`;
    
  const btnVolver = this.querySelector('#reflexion .btn-reflexion');
if (btnVolver) {
  btnVolver.addEventListener('click', () => {
    location.reload(); // recarga la página para reiniciar todo
  });
}

    const componente = this;
    let vidas = 3;
    const fin = this.querySelector('#fin');
    const vidasElemento = this.querySelector('#vidas');
    const imgPaso4 = this.querySelector('#imagen');
    const btnFinalizar = this.querySelector('#end');

    function decoracionesPixeladas() {
      const cantidad = 10;
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
    }

    function limpiarFeedback() {
      for (let i = 1; i <= 10; i++) {
        const fb = componente.querySelector('#feedback' + i);
        if (fb) {
          fb.textContent = '';
          fb.classList.remove('correcto', 'error');
        }
      }
      if (imgPaso4) imgPaso4.style.display = 'none';
    }

    function bloquearBotones() {
      const botones = componente.querySelectorAll('button.opcion-btn');
      botones.forEach(btn => btn.classList.add('disabled'));
    }

    function desbloquearBotones() {
      const botones = componente.querySelectorAll('button.opcion-btn');
      botones.forEach(btn => btn.classList.remove('disabled'));
    }

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
          for (let i = 1; i <= 10; i++) {
            const paso = componente.querySelector('#paso' + i);
            if (paso) paso.classList.add('hidden');
          }
          componente.querySelector('#paso1').classList.remove('hidden');
        }, 4000);
      }
    }

    const correctas = ["B", "B", "A", "B", "A", "B", "B", "A", "A", "A"];

    for (let paso = 1; paso <= 10; paso++) {
      window['validarPaso' + paso] = function (opcion) {
        if (vidas <= 0) return;

        const feedback = componente.querySelector('#feedback' + paso);
        limpiarFeedback();

        if (paso === 4) {
          if (opcion === "A") imgPaso4.src = "img/ChatGPT Image 9 ago 2025, 18_31_33.png";
          else if (opcion === "B") imgPaso4.src = "img/ChatGPT Image 9 ago 2025, 19_22_48.png";
          else if (opcion === "C") imgPaso4.src = "img/ChatGPT Image 9 ago 2025, 19_27_56.png";
          imgPaso4.style.display = 'block';
        }

        if (opcion === correctas[paso - 1]) {
          feedback.textContent = '✅ Correcto!';
          feedback.classList.add('correcto');

          setTimeout(() => {
            if (paso < 10) {
              componente.querySelector('#paso' + paso).classList.add('hidden');
              componente.querySelector('#paso' + (paso + 1)).classList.remove('hidden');
            } else {
              if (btnFinalizar) btnFinalizar.classList.remove('hidden');

              btnFinalizar.addEventListener('click', () => {
  componente.querySelector('#cuestionario').classList.add('hidden');

  const reflexion = componente.querySelector('#reflexion');
  reflexion.classList.remove('hidden');

  const pantallas = Array.from(reflexion.querySelectorAll('.pantalla'));

  // Asegúrate de ocultar todas primero
  pantallas.forEach(p => p.classList.add('hidden'));

  // Mostrar solo la primera
  let index = 0;
  pantallas[index].classList.remove('hidden');

  function mostrarSiguientePantalla() {
    pantallas[index].classList.add('hidden');
    index++;
    if (pantallas[index]) pantallas[index].classList.remove('hidden');
    else location.reload();
  }

  pantallas.forEach(p => {
    const btn = p.querySelector('.btn-reflexion');
    if (btn) btn.addEventListener('click', mostrarSiguientePantalla);
  });
}, { once: true });

            }
          }, 1500);
        } else {
          vidas--;
          actualizarVidas();
          feedback.textContent = '❌ No es la mejor opción. Pensalo de nuevo.';
          feedback.classList.add('error');
          chequearGameOver();
        }
      };
    }

    actualizarVidas(); // Inicializa las vidas al cargar
  }
}

customElements.define('es-uno-dos', PasoUnoDos);