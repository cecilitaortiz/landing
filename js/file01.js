"use strict";
/**
 * Muestra el toast interactivo si existe en el DOM.
 * Agrega la clase "md:block" al elemento con id "toast-interactive".
 * @function
 * @returns {void}
 */
import { fetchFakerData } from './functions.js';
import { saveVote } from './firebase.js'; // Importar saveVote

/**
 * Muestra el toast interactivo si existe en el DOM.
 * @function
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

/**
 * Agrega un listener al elemento con id "demo" para abrir un video de YouTube en una nueva pestaña al hacer clic.
 * @function
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

/**
 * Habilita el formulario de votación y gestiona el envío.
 * @function
 * @returns {void}
 */
const enableForm = () => {
    const form = document.getElementById('form_voting');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const select = document.getElementById('select_product');
            if (select && select.value) {
                await saveVote(select.value);
                form.reset();
            }
        });
    }
};

/**
 * Renderiza las primeras tres cards usando TailwindCSS v4 en el contenedor con id "skeleton-container".
 * @function
 * @param {Array<Object>} data - Arreglo de objetos con las claves title, author, genre y content.
 * @param {string} data[].title - Título del contenido.
 * @param {string} data[].author - Autor del contenido.
 * @param {string} data[].genre - Género del contenido.
 * @param {string} data[].content - Texto del contenido.
 * @returns {void}
 */
const renderCards = (data) => {
    const container = document.getElementById("skeleton-container");
    if (!container) return;

    // Limpiar el contenedor antes de renderizar
    container.innerHTML = "";

    data.slice(0, 3).forEach(item => {
        const card = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 class="text-xl font-bold mb-2">${item.title}</h2>
                <p class="text-gray-600 mb-1"><span class="font-semibold">Autor:</span> ${item.author}</p>
                <p class="text-gray-500 mb-2"><span class="font-semibold">Género:</span> ${item.genre}</p>
                <p class="text-gray-700">${item.content}</p>
            </div>
        `;
        container.innerHTML += card;
    });
};

/**
 * Obtiene datos de la API y renderiza las cards en caso de éxito.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const loadData = async () => {

    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

    try {
        const result = await fetchFakerData(url);

        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            // Llama a renderCards con los datos recibidos
            renderCards(result.body.data);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }

    } catch (error) {

        console.error('Ocurrió un error inesperado:', error);

    }

};

/**
 * Inicializa la carga de datos y la configuración de eventos al cargar el script.
 * @function
 * @returns {void}
 */
(() => {
    loadData();
    showToast();
    showVideo();
    enableForm(); // Invocar enableForm
})();