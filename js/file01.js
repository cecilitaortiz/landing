"use strict";
/**
 * Muestra el toast interactivo si existe en el DOM.
 * Agrega la clase "md:block" al elemento con id "toast-interactive".
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};
/**
 * Agrega un listener al elemento con id "demo" para abrir un video de YouTube en una nueva pestaña al hacer clic.
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

(() => {
    showToast();
    showVideo();
})();