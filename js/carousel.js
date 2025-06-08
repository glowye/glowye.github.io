class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = container.querySelector('.carousel-button.next');
        this.prevButton = container.querySelector('.carousel-button.prev');
        this.currentIndex = 0;
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.autoPlayInterval = null;

        this.initializeSlides();
        this.addEventListeners();
        this.startAutoPlay();
    }

    initializeSlides() {
        // 设置每个slide的位置
        this.slides.forEach((slide, index) => {
            slide.style.left = this.slideWidth * index + 'px';
        });
    }

    moveToSlide(targetIndex) {
        if (targetIndex < 0) {
            targetIndex = this.slides.length - 1;
        } else if (targetIndex >= this.slides.length) {
            targetIndex = 0;
        }

        const amountToMove = -this.slideWidth * targetIndex;
        this.track.style.transform = `translateX(${amountToMove}px)`;
        this.currentIndex = targetIndex;
    }

    addEventListeners() {
        this.nextButton.addEventListener('click', () => {
            this.moveToSlide(this.currentIndex + 1);
            this.resetAutoPlay();
        });

        this.prevButton.addEventListener('click', () => {
            this.moveToSlide(this.currentIndex - 1);
            this.resetAutoPlay();
        });

        // 触摸事件支持
        let startX = 0;
        let isDragging = false;
        let currentTranslate = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoPlay();
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            currentTranslate = -this.slideWidth * this.currentIndex + diff;
            this.track.style.transform = `translateX(${currentTranslate}px)`;
        });

        this.track.addEventListener('touchend', (e) => {
            isDragging = false;
            const movedBy = currentTranslate + this.slideWidth * this.currentIndex;
            
            if (Math.abs(movedBy) > this.slideWidth / 4) {
                if (movedBy > 0) {
                    this.moveToSlide(this.currentIndex - 1);
                } else {
                    this.moveToSlide(this.currentIndex + 1);
                }
            } else {
                this.moveToSlide(this.currentIndex);
            }
            
            this.startAutoPlay();
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.moveToSlide(this.currentIndex + 1);
        }, 5000); // 每5秒切换一次
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// 页面加载完成后初始化轮播图
window.addEventListener('load', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
}); 