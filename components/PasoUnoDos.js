class PasoUnoDos extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <style>
    /* =================== ESTILOS DEL JUEGO =================== */
    @keyframes fondoAnimado { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .fondo-dinamico { background: linear-gradient(-45deg, #1e3a8a, #3b82f6, #6366f1, #1e40af); background-size: 400% 400%; animation: fondoAnimado 15s ease infinite; height: 100vh; width: 100vw; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3rem; padding: 3rem 6rem; color: white; overflow: visible; position: relative; font-family: Arial, sans-serif; text-align: center; }
    .decorativo { position: absolute; opacity: 0.6; animation: flotar 6s ease-in-out infinite; pointer-events: none; z-index: 0; }
    @keyframes flotar { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
    .opcion-btn { background-color: #4f46e5; padding: 1.25rem 2.5rem; border-radius: 0.75rem; font-weight: bold; font-size: 1.5rem; transition: all 0.3s ease; cursor: pointer; user-select: none; border: none; color: white; box-shadow: 0 5px 10px rgba(0,0,0,0.3); z-index: 10; max-width: 100%; white-space: normal; }
    .opcion-btn:hover:not(.disabled) { background-color: #6366f1; transform: scale(1.05); }
    .disabled { pointer-events: none; opacity: 0.5; }
    .animate-fadeIn { animation: fadeIn 0.6s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    #vidas { font-size: 3rem; font-weight: 700; user-select: none; z-index: 10; text-shadow: 0 0 10px rgba(255,0,0,0.7); animation: pulse 1s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
    h2 { font-size: 2.5rem; text-shadow: 0 0 8px rgba(0,0,0,0.7); margin-bottom: 1rem; }
    p { font-size: 1.5rem; min-height: 2em; margin-top: 1rem; padding: 0.5rem 1.5rem; border-radius: 0.5rem; font-weight: 600; max-width: 900px; margin-left: auto; margin-right: auto; word-break: break-word; background-color: rgba(0, 0, 0, 0.25); box-shadow: 0 0 10px rgba(0,0,0,0.3); }
    .correcto { background-color: #22c55e88; color: #166534; border: 2px solid #16a34a; box-shadow: 0 0 10px #22c55eaa; }
    .error { background-color: #7c3aed66; color: #ede9fe; border: 2px solid #5b21b6; box-shadow: 0 0 10px #7c3aedaa; }
    #fin { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #a78bfa; font-size: 3rem; font-weight: 900; text-align: center; text-shadow: 0 0 15px #a78bfaaa; opacity: 0; pointer-events: none; transition: opacity 0.7s ease; z-index: 50; background: rgba(67, 56, 202, 0.85); padding: 1.5rem 3rem; border-radius: 1rem; user-select: none; letter-spacing: 1px; max-width: 90vw; word-break: break-word; }
    #fin.visible { opacity: 1; pointer-events: auto; }
    #imagen { width: 24rem; height: auto; border-radius: 0.5rem; margin-top: 1rem; box-shadow: 0 0 15px rgba(0,0,0,0.5); z-index: 10; display:none; }

    /* =================== ESTILOS REFLEXIÓN =================== */
    .hidden { display: none; }
    .pantalla { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; padding: 2rem; gap: 1.5rem; }
    .btn-reflexion { background: linear-gradient(90deg,#4f46e5,#3b82f6,#6366f1); color:white; font-weight:bold; padding:1rem 2rem; border-radius:0.75rem; font-size:1.25rem; cursor:pointer; transition: all 0.3s ease; box-shadow:0 5px 10px rgba(0,0,0,0.3); }
    .btn-reflexion:hover { transform: scale(1.05); background: linear-gradient(90deg,#6366f1,#3b82f6,#4f46e5); }
    .reflexion-contenedor { background: rgba(0,0,0,0.25); padding:2rem; border-radius:1rem; max-width:900px; box-shadow:0 0 15px rgba(0,0,0,0.3); }
    .reflexion-img { width: 20rem; max-width: 80vw; border-radius:0.75rem; box-shadow:0 0 15px rgba(0,0,0,0.5); }
  </style>

  <!-- =================== JUEGO =================== -->
  <div id="cuestionario">
    <div class="fondo-dinamico" id="fondo">
      <div id="decoraciones"></div>
      <div id="vidas" aria-live="polite" aria-atomic="true">❤️❤️❤️</div>

      ${[1,2,3,4,5,6,7,8,9,10].map(paso => `
        <div id="paso${paso}" class="${paso===1?'animate-fadeIn':'hidden animate-fadeIn'}" style="z-index:10;">
          <h2>🧩 PASO ${paso} – ${
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
          ${paso===4?`<img id="imagen" src="" alt="Paso 4 imagen">`:``}
          <p id="feedback${paso}" aria-live="polite"></p>
          ${paso===10?`<div class="flex justify-center items-center pb-10" style="z-index:20;">
            <button id="end" class="opcion-btn hidden">Finalizar aventura</button>
          </div>`:""}
        </div>
      `).join('')}

      <p id="fin"></p>
    </div>
  </div>

  <!-- =================== REFLEXIÓN =================== -->
  <div id="reflexion" class="hidden">
    <div class="pantalla fondo-dinamico">
      <h1 class="text-6xl font-bold drop-shadow-lg">🌟FELICIDADES LLEGASTE AL FINAL🌟</h1>
      <p class="mt-4">¡Gran trabajo completando todos los pasos!</p>
    </div>
    <div class="pantalla fondo-dinamico">
      <h2 class="text-4xl font-bold drop-shadow-md">- REFLEXIONA -</h2>
      <div class="reflexion-contenedor mt-4">
        <p>✅ "Un error no define quién eres, pero tu valentía para admitirlo y repararlo sí"</p>
        <p>
          Aceptar nuestros errores es reconocer que no somos perfectos, pero sí capaces de mejorar.<br>
          Es entender que cada fallo es una lección disfrazada de tropiezo.<br>
          Es dejar el orgullo a un lado para darle paso a la humildad y al aprendizaje.<br>
          Porque solo quien asume su responsabilidad puede crecer de verdad.
        </p>
      </div>
      <button class="btn-reflexion mt-6">Siguiente</button>
    </div>
    <div class="pantalla fondo-dinamico">
      <h2 class="text-4xl font-bold drop-shadow-md">- TOMA DECISIONES -</h2>
      <p class="text-xl">¿Qué harías la próxima vez?</p>
      <ul class="text-lg font-bold list-disc list-inside mt-4">
        <li>A. Ignorar el problema</li>
        <li>B. Hacerte la víctima</li>
        <li>C. Pedir disculpas sinceras</li>
        <li>😃Quien asume su responsabilidad, conquista el respeto de los demás y la paz consigo mismo.😃</li>
      </ul>
      <button class="btn-reflexion mt-6">Siguiente</button>
    </div>
    <div class="pantalla fondo-dinamico md:flex-row gap-6">
      <img src="Img/Niña sonrriente.png" alt="Imagen izquierda" class="reflexion-img" />
      <div class="reflexion-contenedor text-center md:text-left">
        <h2 class="text-4xl font-bold mb-4 drop-shadow-md">🎉 "¡Recuerda!" 🎉</h2>
        <p class="text-lg font-semibold leading-relaxed">
          🌟Si alguna vez te equivocas, no pierdas tiempo buscando culpables ni excusas. Mira de frente tu error, reconoce el daño y repara lo que esté en tus manos.<br>
          Pedir perdón no disminuye tu valor, lo engrandece🌟
        </p>
      </div>
      <img src="Img/Niño sonrriente.png" alt="Imagen derecha" class="reflexion-img" />
      <button class="btn-reflexion mt-6">Siguiente</button>
    </div>
    <div class="pantalla fondo-dinamico">
      <h2 class="text-4xl font-bold drop-shadow-md">🎈 ¡MUCHAS 🌟FELICIDADES SUPERASTE ESTE RETO! 🎈</h2>
      <p>Gracias por participar y reflexionar sobre tus acciones.</p>
      <button class="btn-reflexion mt-6">Volver al inicio</button>
    </div>
  </div>
`;

    const componente = this;
    let vidas = 3;
    const fin = this.querySelector('#fin');
    const vidasElemento = this.querySelector('#vidas');
    const imgPaso4 = this.querySelector('#imagen');
    const btnFinalizar = this.querySelector('#end');

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
                pantallas.forEach(p => p.classList.add('hidden'));
                pantallas[0].classList.remove('hidden');

                pantallas.forEach((pantalla, i) => {
                  const btn = pantalla.querySelector('.btn-reflexion');
                  if (btn) {
                    btn.onclick = () => {
                      pantalla.classList.add('hidden');
                      if (pantallas[i + 1]) {
                        pantallas[i + 1].classList.remove('hidden');
                      } else {
                        location.reload(); // Reinicia el juego
                      }
                    };
                  }
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