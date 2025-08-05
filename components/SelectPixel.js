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
    </style>

        <div class="h-screen bg-blue-950 text-white flex flex-col items-center justify-center gap-6">
        <h2 class="text-3xl font-bold">🕹️ Elegí tu personaje</h2>
    <div class="flex gap-10">
            ${this.crearBoton("niño", "img/image-removebg-preview (1).png", "bg-blue-600")}
            ${this.crearBoton("niña", "img/image-removebg-preview (2).png", "bg-pink-500")}
        </div>
    </div>
    `;
}

crearBoton(nombre, imagen, color) {
    return `
    <div class="flex flex-col items-center bg-white bg-opacity-80 p-4 rounded-xl shadow-md hover:scale-105 transition">
        <img src="${imagen}" alt="${nombre}" class="w-20 h-auto" />
        <button class="${color} text-white px-3 py-1 mt-2 rounded" onclick="seleccionarPersonaje('${nombre}')">
            Elegir
        </button>
    </div>
    `;
}
}

customElements.define('select-character', SelectPixel);
