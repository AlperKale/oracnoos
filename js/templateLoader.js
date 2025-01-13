// Template Loader
class TemplateLoader {
    constructor() {
        this.templates = {
            header: 'partials/header.html',
            hero: 'partials/hero.html',
            mainContent: 'partials/main-content.html',
            sidebar: 'partials/sidebar.html',
            newsletter: 'partials/newsletter.html',
            footer: 'partials/footer.html'
        };
    }

    async loadTemplate(templateId, targetId) {
        try {
            const response = await fetch(this.templates[templateId]);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(targetId).innerHTML = html;
            console.log(`${templateId} başarıyla yüklendi`);
        } catch (error) {
            console.error(`${templateId} yüklenirken hata oluştu:`, error);
            document.getElementById(targetId).innerHTML = `<div class="error">İçerik yüklenirken bir hata oluştu.</div>`;
        }
    }

    async loadAllTemplates() {
        try {
            await Promise.all([
                this.loadTemplate('header', 'header'),
                this.loadTemplate('hero', 'hero'),
                this.loadTemplate('mainContent', 'main-content'),
                this.loadTemplate('sidebar', 'sidebar'),
                this.loadTemplate('newsletter', 'newsletter'),
                this.loadTemplate('footer', 'footer')
            ]);
            console.log('Tüm şablonlar başarıyla yüklendi');
            // Şablonlar yüklendikten sonra diğer modülleri başlat
            this.initializeModules();
        } catch (error) {
            console.error('Şablonlar yüklenirken hata oluştu:', error);
        }
    }

    initializeModules() {
        // Header modülünü başlat
        if (typeof HeaderModule !== 'undefined') {
            new HeaderModule().init();
        }

        // Hero modülünü başlat
        if (typeof HeroModule !== 'undefined') {
            new HeroModule().init();
        }

        // Diğer modülleri başlat
        this.initializeNewsletterForm();
    }

    initializeNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                // Bülten kaydı işlemleri burada yapılacak
                console.log('Bülten kaydı:', email);
                form.reset();
                alert('Bültene başarıyla kaydoldunuz!');
            });
        }
    }
}

// Sayfa yüklendiğinde template loader'ı başlat
document.addEventListener('DOMContentLoaded', () => {
    const loader = new TemplateLoader();
    loader.loadAllTemplates();
}); 