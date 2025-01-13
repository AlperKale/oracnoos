// Main Content modülü
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('components/main-content.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.getElementById('main-container').innerHTML = content;
        
        // Main content'e özgü JavaScript işlevleri
        initializeMainContent();
    } catch (error) {
        console.error('Main content yüklenirken hata oluştu:', error);
    }
});

function initializeMainContent() {
    // Teknoloji haberleri grid'i için içerik
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        loadNewsContent();
    }

    // İncelemeler için yatay kaydırma
    const scrollContent = document.querySelector('.horizontal-scroll');
    if (scrollContent) {
        initializeHorizontalScroll();
    }

    // Video içerik grid'i için içerik
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid) {
        loadVideoContent();
    }
}

function loadNewsContent() {
    // Haberler için örnek veri
    const newsData = [
        {
            title: 'Yapay Zeka ve Gelecek',
            category: 'Teknoloji',
            image: 'assets/images/news/news1.jpg',
            excerpt: 'Yapay zeka teknolojilerinin geleceğimizi nasıl şekillendireceğine dair detaylı bir analiz...'
        }
        // Diğer haberler buraya eklenecek
    ];

    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        newsGrid.innerHTML = newsData.map(news => `
            <article class="news-item">
                <img src="${news.image}" alt="${news.title}" />
                <div class="news-content">
                    <span class="category">${news.category}</span>
                    <h3>${news.title}</h3>
                    <p>${news.excerpt}</p>
                </div>
            </article>
        `).join('');
    }
}

function initializeHorizontalScroll() {
    const scrollContainer = document.querySelector('.horizontal-scroll');
    const prevBtn = scrollContainer.querySelector('.prev');
    const nextBtn = scrollContainer.querySelector('.next');
    const scrollContent = scrollContainer.querySelector('.scroll-content');

    prevBtn.addEventListener('click', () => {
        scrollContent.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        scrollContent.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
}

function loadVideoContent() {
    // Video içerikleri için örnek veri
    const videoData = [
        {
            title: 'Yeni Teknolojiler',
            thumbnail: 'assets/images/videos/video1.jpg',
            duration: '5:30'
        }
        // Diğer videolar buraya eklenecek
    ];

    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid) {
        videoGrid.innerHTML = videoData.map(video => `
            <article class="video-item">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}" />
                    <span class="duration">${video.duration}</span>
                </div>
                <h3>${video.title}</h3>
            </article>
        `).join('');
    }
} 