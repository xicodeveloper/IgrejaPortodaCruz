const carousel = {
    currentIndex: 0,
    itemCount: 0,
    carouselElement: null,
    indicatorsContainer: null,
    autoSlideTimer: null,

    init() {
        this.carouselElement = document.getElementById('carousel');
        this.indicatorsContainer = document.getElementById('indicators');

        if (!this.carouselElement) return;

        const items = this.carouselElement.querySelectorAll('.carousel-item');
        this.itemCount = items.length;

        // Cria indicadores
        this.createIndicators();

        // Inicia auto-slide
        this.startAutoSlide();

        // Pausa auto-slide no hover
        const wrapper = document.querySelector('.carousel-wrapper');
        wrapper.addEventListener('mouseenter', () => this.pauseAutoSlide());
        wrapper.addEventListener('mouseleave', () => this.startAutoSlide());

        // Vai para o primeiro slide
        this.goToSlide(0);
    },

    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        for (let i = 0; i < this.itemCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    },

    goToSlide(index) {
        if (index < 0) index = this.itemCount - 1;
        if (index >= this.itemCount) index = 0;

        this.currentIndex = index;

        // Move o carrossel
        const slidePercentage = -index * (100 / this.itemCount);
        this.carouselElement.style.transform = `translateX(${slidePercentage}%)`;

        // Atualiza indicadores
        this.updateIndicators();
    },

    updateIndicators() {
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    },

    navigate(direction) {
        this.pauseAutoSlide();
        this.goToSlide(this.currentIndex + direction);
        setTimeout(() => this.startAutoSlide(), 1000);
    },

    startAutoSlide() {
        this.pauseAutoSlide();
        this.autoSlideTimer = setInterval(() => {
            this.goToSlide(this.currentIndex + 1);
        }, 4000);
    },

    pauseAutoSlide() {
        if (this.autoSlideTimer) {
            clearInterval(this.autoSlideTimer);
            this.autoSlideTimer = null;
        }
    }
};

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
});

// Exporta para uso global (compatibilidade com Blazor)
window.carousel = {
    init: (element, netRef) => {
        // Adaptação para Blazor
        carousel.carouselElement = element;
        carousel.itemCount = element.querySelectorAll('.carousel-item').length;
        carousel.goToSlide(0);
        carousel.startAutoSlide();
    },
    goToSlide: (element, index) => {
        carousel.carouselElement = element;
        carousel.goToSlide(index);
    },
    navigate: (direction) => carousel.navigate(direction)
};