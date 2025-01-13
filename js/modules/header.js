class HeaderModule {
    constructor() {
        this.header = null;
        this.searchForm = null;
        this.searchInput = null;
        this.navLinks = null;
    }

    init() {
        this.header = document.querySelector('.main-header');
        this.searchForm = document.querySelector('.search-bar');
        this.searchInput = document.querySelector('.search-bar input');
        this.navLinks = document.querySelectorAll('.nav-links a');

        if (this.header) {
            this.initializeScrollBehavior();
            this.initializeSearchBar();
            this.initializeNavLinks();
        }
    }

    initializeScrollBehavior() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Aşağı scroll
                this.header.style.transform = 'translateY(-100%)';
            } else {
                // Yukarı scroll
                this.header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    initializeSearchBar() {
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchTerm = this.searchInput.value.trim();
                if (searchTerm) {
                    // Arama işlemleri burada yapılacak
                    console.log('Arama yapılıyor:', searchTerm);
                    this.searchInput.value = '';
                }
            });
        }
    }

    initializeNavLinks() {
        if (this.navLinks) {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    this.navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });
        }
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderModule;
} 