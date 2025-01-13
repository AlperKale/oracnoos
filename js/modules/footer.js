// Footer modülü
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('components/footer.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.getElementById('footer-container').innerHTML = content;
        
        // Footer'a özgü JavaScript işlevleri
        initializeFooter();
    } catch (error) {
        console.error('Footer yüklenirken hata oluştu:', error);
    }
});

function initializeFooter() {
    // Sosyal medya linklerini izleme
    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks) {
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Sosyal medya tıklama analitikleri burada yapılabilir
                console.log('Sosyal medya linki tıklandı:', link.getAttribute('href'));
            });
        });
    }

    // Footer linklerini izleme
    const footerLinks = document.querySelectorAll('.footer-section ul a');
    if (footerLinks) {
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Footer link tıklama analitikleri burada yapılabilir
                console.log('Footer linki tıklandı:', link.getAttribute('href'));
            });
        });
    }

    // Telif hakkı yılını otomatik güncelleme
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2025', year.toString());
    }
} 