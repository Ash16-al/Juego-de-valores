class PixelKids extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-row justify-center items-center gap-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <!-- Niño -->
        <div class="flex flex-col items-center">
          <img src="img/image-removebg-preview (1).png" alt="Niño pixelado" class="w-24 h-auto" />
          <p class="mt-2 text-sm font-semibold text-blue-600">Niño</p>
        </div>

        <!-- Niña -->
        <div class="flex flex-col items-center">
          <img src="img/image-removebg-preview (2).png" alt="Niña pixelada" class="w-24 h-auto" />
          <p class="mt-2 text-sm font-semibold text-pink-600">Niña</p>
        </div>
      </div>
    `;
  }
}

customElements.define('pixel-kids', PixelKids);
