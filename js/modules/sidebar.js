// Sidebar modülü
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('components/sidebar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.getElementById('sidebar-container').innerHTML = content;
        
        // Sidebar'a özgü JavaScript işlevleri
        initializeSidebar();
    } catch (error) {
        console.error('Sidebar yüklenirken hata oluştu:', error);
    }
});

function initializeSidebar() {
    // Popüler haberler için içerik
    const popularList = document.querySelector('.popular-list');
    if (popularList) {
        loadPopularNews();
    }

    // Teknoloji gündemi için içerik
    const agendaItems = document.querySelector('.agenda-items');
    if (agendaItems) {
        loadTechAgenda();
    }
}

function loadPopularNews() {
    // Popüler haberler için örnek veri
    const popularNews = [
        {
            title: 'Yeni Nesil Oyun Konsolları',
            date: '12 Ocak 2024',
            image: 'assets/images/news/popular1.jpg'
        },
        {
            title: 'Elektrikli Araçlar',
            date: '11 Ocak 2024',
            image: 'assets/images/news/popular2.jpg'
        }
        // Diğer popüler haberler buraya eklenecek
    ];

    const popularList = document.querySelector('.popular-list');
    if (popularList) {
        popularList.innerHTML = popularNews.map(news => `
            <article class="popular-item">
                <img src="${news.image}" alt="${news.title}" />
                <div class="popular-content">
                    <h4>${news.title}</h4>
                    <span class="date">${news.date}</span>
                </div>
            </article>
        `).join('');
    }
}

function loadTechAgenda() {
    // Teknoloji gündemi için örnek veri
    const agendaItems = [
        { text: 'Yapay Zeka Gelişmeleri', number: 1 },
        { text: '5G Teknolojisi', number: 2 },
        { text: 'Siber Güvenlik', number: 3 }
        // Diğer gündem maddeleri buraya eklenecek
    ];

    const agendaList = document.querySelector('.agenda-items');
    if (agendaList) {
        agendaList.innerHTML = agendaItems.map(item => `
            <div class="agenda-item">
                <span class="number">${item.number}</span>
                <span class="text">${item.text}</span>
            </div>
        `).join('');
    }
} 