// Newsletter modülü
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('components/newsletter.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.getElementById('newsletter-container').innerHTML = content;
        
        // Newsletter'a özgü JavaScript işlevleri
        initializeNewsletter();
    } catch (error) {
        console.error('Newsletter yüklenirken hata oluştu:', error);
    }
});

function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // E-posta doğrulama
    if (!validateEmail(email)) {
        showNewsletterMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
        return;
    }

    // API'ye gönderme simülasyonu
    console.log('Newsletter kaydı:', email);
    showNewsletterMessage('Bültenimize başarıyla kaydoldunuz!', 'success');
    emailInput.value = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNewsletterMessage(message, type) {
    const container = document.querySelector('.newsletter-content');
    const existingMessage = container.querySelector('.message');
    
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    container.appendChild(messageElement);

    // 3 saniye sonra mesajı kaldır
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
} 