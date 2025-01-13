class HeroModule {
    constructor() {
        this.currentSlide = 0;
        this.slides = null;
        this.autoPlayInterval = null;
        this.trendingNews = null;
    }

    init() {
        this.slides = document.querySelectorAll('.featured-article');
        this.trendingNews = document.querySelector('.trending-news-slider');

        if (this.slides.length > 0) {
            this.initializeSlider();
        }

        if (this.trendingNews) {
            this.initializeTrendingNews();
        }
    }

    initializeSlider() {
        // İlk slide'ı göster
        this.showSlide(0);

        // Otomatik geçiş başlat
        this.startAutoPlay();

        // Touch olaylarını ekle
        this.initializeTouchEvents();

        // Klavye olaylarını ekle
        this.initializeKeyboardEvents();
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.style.opacity = i === index ? '1' : '0';
        });
        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 saniyede bir geçiş yap
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    initializeTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;

        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        }, false);

        heroSection.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        }, false);

        heroSection.addEventListener('touchend', () => {
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > 50) { // En az 50px kaydırma
                if (difference > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            this.startAutoPlay();
        }, false);
    }

    initializeKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
                this.stopAutoPlay();
                this.startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.stopAutoPlay();
                this.startAutoPlay();
            }
        });
    }

    initializeTrendingNews() {
        let isScrolling = false;
        const scrollStep = 2; // Piksel cinsinden kaydırma miktarı

        const scroll = () => {
            if (!isScrolling) return;
            
            this.trendingNews.scrollLeft += scrollStep;
            
            // Sona gelindiğinde başa dön
            if (this.trendingNews.scrollLeft >= this.trendingNews.scrollWidth - this.trendingNews.clientWidth) {
                this.trendingNews.scrollLeft = 0;
            }
            
            requestAnimationFrame(scroll);
        };

        // Otomatik kaydırmayı başlat
        this.trendingNews.addEventListener('mouseenter', () => {
            isScrolling = false;
        });

        this.trendingNews.addEventListener('mouseleave', () => {
            isScrolling = true;
            scroll();
        });

        // Başlangıçta kaydırmayı başlat
        isScrolling = true;
        scroll();
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroModule;
} 