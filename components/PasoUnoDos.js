class PasoUnoDos extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="h-screen bg-gradient-to-br from-indigo-800 to-blue-900 text-white flex flex-col items-center justify-center gap-10 px-6 transition-all duration-500 ease-in-out">
        <div id="paso1" class="text-center animate-fadeIn">
          <h2 class="text-4xl font-bold mb-4">🧩 PASO 1 – RECONOCER EL PROBLEMA</h2>
          <p class="text-lg mb-6">¿Cuál es el problema?</p>
          <div class="flex flex-col gap-3">
            <button onclick="validarPaso1('A')" class="opcion-btn">A. Teacher Walter es muy exigente</button>
            <button onclick="validarPaso1('B')" class="opcion-btn">B. Mandaste un mensaje irrespetuoso al teacher</button>
            <button onclick="validarPaso1('C')" class="opcion-btn">C. El grupo de WhatsApp confunde</button>
          </div>
          <p id="feedback1" class="mt-6 text-xl font-semibold"></p>
        </div>
 
        <div id="paso2" class="text-center hidden animate-fadeIn">
          <h2 class="text-4xl font-bold mb-4">🧩 PASO 2 – ANALIZAR EL PROBLEMA</h2>
          <p class="text-lg mb-6">¿Qué puede pasar?</p>
          <div class="flex flex-col gap-3">
            <button onclick="validarPaso2('A')" class="opcion-btn">A. Teacher Walter lo toma como broma</button>
            <button onclick="validarPaso2('B')" class="opcion-btn">B. Podés perder puntos o recibir un llamado de atención</button>
            <button onclick="validarPaso2('C')" class="opcion-btn">C. Te toca hablar con Coordinación</button>
          </div>
          <p id="feedback2" class="mt-6 text-xl font-semibold"></p>
        </div>

      <div id="paso3" class="text-center hidden animate-fadeIn">
       <h2 class="text-4xl font-bold mb-4">🧩 PASO 3 – CONSIDERAR METAS</h2>
      <p>¿Qué puede pasar?</p>
      <div class="flex flex-col gap-3">
      <button onclick="validarPaso3('A')" class="opcion-btn">A. Teacher Walter lo toma como broma</button>
            <button onclick="validarPaso3('B')" class="opcion-btn">B. Podés perder puntos o recibir un llamado de atención</button>
            <button onclick="validarPaso3('C')" class="opcion-btn">C. Te toca hablar con Coordinación</button>
      </div>
      <p id="feedback3" class="mt-6 text-xl font-semibold"></p>
      </div>

      <div id="paso4" class="text-center hidden animate-fadeIn">
       <h2 class="text-4xl font-bold mb-4">🧩 PASO 4 – BUSCAR ALTERNATIVAS</h2>
      <p>¿Qué hacés ahora?</p>
      <div class="flex flex-col gap-3">
      <button onclick="validarPaso4('A')" class="opcion-btn">A.  Borrás el mensaje y hacés como si nada
      </button>
            <button onclick="validarPaso4('C')" class="opcion-btn">B. Le escribís una disculpa</button>
            <button onclick="validarPaso4('B')" class="opcion-btn">C. Mandás un sticker gracioso que diga "ja ja es broma"</button>
      </div>
      <p id="feedback4" class="mt-6 text-xl font-semibold"></p><br>
      <img src="" alt="Feedback Image" id="imagen" class="w-64 h-50 mx-auto block hidden rounded" />
      
      </div>
      </div>
 
      <style>
        .opcion-btn {
          background-color: #4f46e5;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .opcion-btn:hover {
          background-color: #6366f1;
          transform: scale(1.05);
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    `;
  }
}
customElements.define('es-uno-dos', PasoUnoDos);
 

// Funciones globales
function validarPaso1(opcion) {
  const feedback = document.getElementById("feedback1");
  if (opcion === 'B') {
    feedback.textContent = "✅ B → Reconocés el problema. ¡Ahora a ver cómo lo solucionás!";
    setTimeout(() => {
      document.getElementById("paso1").classList.add("hidden");
      document.getElementById("paso2").classList.remove("hidden");
    }, 1500);
  } else {
    feedback.textContent = "❌ Esa no es la mejor respuesta. Pensalo bien.";
  }
}
 
function validarPaso2(opcion) {
  const feedback = document.getElementById("feedback2");
  if (opcion === 'B') {
    feedback.textContent = "✅ B → Es posible que tengas consecuencias, pero todo depende de cómo respondas.";
    setTimeout(() => {
      document.getElementById('paso2').classList.add('hidden')
      document.getElementById('paso3').classList.remove('hidden')
    }, 1500);
  } else {
    feedback.textContent = "❌ No es la mejor opción. Pensalo de nuevo.";
  }
};

function validarPaso3(opcion){
  const feedback = document.getElementById('feedback3')
  if(opcion === 'A'){
    feedback.textContent = '✅ A → Buena decisión, buscar resolver con madurez.';
    setTimeout(()=> {
      document.getElementById('paso3').classList.add('hidden')
      document.getElementById('paso4').classList.remove('hidden')
    },1500)
  } else{
    feedback.textContent = "❌ No es la mejor opción. Pensalo de nuevo."
  }
};

function validarPaso4(opcion){
  const feedback = document.getElementById('feedback4');
  const imagen = document.getElementById('imagen');

  if(opcion === 'B'){
    feedback.textContent = '✅ RUTA B – PEDIR DISCULPAS';
    imagen.src = '/img/ChatGPT Image 9 ago 2025, 19_22_48.png';
    imagen.classList.remove('hidden');

  } else if(opcion === 'A'){
    feedback.textContent = 'Lo eliminás rápido. Pero 🔔 "Teacher Walter ha leído tu mensaje"';
    imagen.src = '/img/ChatGPT Image 9 ago 2025, 18_31_33.png';
    imagen.classList.remove('hidden');

  } else {
    feedback.textContent = '🔀 RUTA C – USAR STICKER GRACIOSO';
    imagen.src = '/img/ChatGPT Image 9 ago 2025, 19_27_56.png'
    imagen.classList.remove('hidden');
  }
}