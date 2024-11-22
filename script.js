function showSurprise() {
    const surpriseElement = document.getElementById("surprise");
    if (surpriseElement) {
        surpriseElement.classList.remove("hidden");
        window.scrollTo({
            top: surpriseElement.offsetTop,
            behavior: 'smooth'
        });
    }
}