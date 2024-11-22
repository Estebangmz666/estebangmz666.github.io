function showSurprise() {
    const surpriseElement = document.getElementById("surprise");
    surpriseElement.classList.remove("hidden");
    window.scrollTo({
        top: surpriseElement.offsetTop,
        behavior: 'smooth'
    });
}