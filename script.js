// --- LOADING SCREEN ---
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    let progress = 0;
    let fakeInterval;

    function setProgress(val) {
        progressFill.style.width = val + '%';
        progressText.textContent = val + '%';
    }

    function fakeLoading() {
        fakeInterval = setInterval(() => {
            if (progress < 90) {
                progress += Math.floor(Math.random() * 5) + 1;
                if (progress > 90) progress = 90;
                setProgress(progress);
            }
        }, 40);
    }

    fakeLoading();

    window.addEventListener('load', () => {
        clearInterval(fakeInterval);
        progress = 100;
        setProgress(progress);
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }, 400);
    });
});

// --- AOS INIT ---
document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 80
        });
    }
});

// --- COUNTERS (Hero) ---
window.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        counter.textContent = '0';
    });
    function animateHeroCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = Math.max(1, Math.floor(target / 60));
            function update() {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    counter.textContent = current;
                    setTimeout(update, 18);
                } else {
                    counter.textContent = target;
                }
            }
            update();
        });
    }
    setTimeout(animateHeroCounters, 1200);
});

// --- MOBILE NAV ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// --- SMOOTH SCROLL ---
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// --- HEADER BG ON SCROLL ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0,0,0,0.98)';
        header.style.boxShadow = '0 2px 20px rgba(212,175,55,0.08)';
    } else {
        header.style.background = 'rgba(0,0,0,0.9)';
        header.style.boxShadow = 'none';
    }
});

// --- MODELS FILTER ---
const filterButtons = document.querySelectorAll('.filter-btn');
const modelCards = document.querySelectorAll('.model-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        modelCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- PARALLAX HERO ---
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// --- DRAG & DROP PHOTO UPLOAD ---
document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const photoInput = document.getElementById('photoUpload');
    const uploadedPhotos = document.getElementById('uploadedPhotos');
    if (!uploadArea || !photoInput || !uploadedPhotos) return;

    function handleFiles(files) {
        const types = ['face', 'profile', 'full'];
        Array.from(files).forEach((file, idx) => {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = e => {
                const type = types[idx] || types[0];
                const photoItem = uploadedPhotos.querySelector(`.photo-item[data-type="${type}"]`);
                if (photoItem) {
                    photoItem.innerHTML = `<img src="${e.target.result}" alt="${type}">
                        <button class="remove-photo" title="Удалить" type="button">&times;</button>`;
                    const removeBtn = photoItem.querySelector('.remove-photo');
                    removeBtn.addEventListener('click', () => {
                        photoItem.innerHTML = `<div class="photo-placeholder">
                            <i class="fas fa-user${type==='profile'?'-circle':type==='full'?'-friends':''}"></i>
                            <span>${type==='face'?'Фейс':type==='profile'?'Профиль':'Рост'}</span>
                        </div>`;
                    });
                }
            };
            reader.readAsDataURL(file);
        });
    }

    uploadArea.addEventListener('click', () => photoInput.click());
    uploadArea.addEventListener('dragover', e => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', e => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', e => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    photoInput.addEventListener('change', e => {
        handleFiles(e.target.files);
    });
});

// --- FORM HANDLING ---
const castingForm = document.getElementById('castingForm');
if (castingForm) {
    castingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        // Basic validation
        if (!data.name || !data.age || !data.height || !data.phone || !data.email) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        if (data.age < 16 || data.age > 30) {
            showNotification('Возраст должен быть от 16 до 30 лет', 'error');
            return;
        }
        if (data.height < 150 || data.height > 220) {
            showNotification('Рост должен быть от 150 до 220 см', 'error');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }
        // Check photos
        const uploaded = document.querySelectorAll('.photo-item img');
        if (uploaded.length < 3) {
            showNotification('Пожалуйста, загрузите 3 фото: фейс, профиль, рост', 'error');
            return;
        }
        // Simulate sending
        const btn = this.querySelector('.btn-primary');
        const loading = btn.querySelector('.btn-loading');
        btn.disabled = true;
        if (loading) loading.style.display = 'block';
        setTimeout(() => {
            if (loading) loading.style.display = 'none';
            btn.disabled = false;
            showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            this.reset();
            // Reset photo previews
            document.querySelectorAll('.photo-item').forEach(item => {
                const type = item.getAttribute('data-type');
                item.innerHTML = `<div class="photo-placeholder">
                    <i class="fas fa-user${type==='profile'?'-circle':type==='full'?'-friends':''}"></i>
                    <span>${type==='face'?'Фейс':type==='profile'?'Профиль':'Рост'}</span>
                </div>`;
            });
        }, 1800);
    });
}

// --- NOTIFICATION SYSTEM ---
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .model-card, .contact-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .model-card {
        transition: all 0.3s ease;
    }
    
    .model-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    .service-card {
        transition: all 0.3s ease;
    }
    
    .service-card:hover {
        transform: translateY(-10px);
    }
    
    .btn {
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
    }
    
    .social-icon {
        transition: all 0.3s ease;
    }
    
    .social-icon:hover {
        transform: translateY(-3px) scale(1.1);
    }
`;

document.head.appendChild(style);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(img);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statsObserver.observe(statsSection);
} 

function openPortfolio(model) {
    const modal = document.getElementById('portfolioModal');
    const content = document.getElementById('portfolioContent');
    let html = '';
    switch(model) {
        case 'anna':
            html = `<h2>Портфолио Анны Котковой</h2>
                <img src='https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' style='width:100%;max-width:350px;border-radius:16px;margin-bottom:1rem;'>
                <p><b>Fashion, Beauty, Editorial.</b><br>Работала с Vogue, Harper’s Bazaar, участвовала в показах Mercedes-Benz Fashion Week. Съёмки для ведущих российских и европейских брендов.</p>`;
            break;
        case 'maria':
            html = `<h2>Портфолио Марии Аванесянц</h2>
                <img src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' style='width:100%;max-width:350px;border-radius:16px;margin-bottom:1rem;'>
                <p><b>Editorial, Runway, Commercial.</b><br>Победительница конкурса новых лиц, участница показов в Милане и Париже. Снималась для Elle, Cosmopolitan, Zara.</p>`;
            break;
        case 'sofia':
            html = `<h2>Портфолио Софии Козловой</h2>
                <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' style='width:100%;max-width:350px;border-radius:16px;margin-bottom:1rem;'>
                <p><b>Beauty, Commercial, Runway.</b><br>Лицо рекламных кампаний L’Oréal и Maybelline. Опыт работы с топовыми фотографами, публикации в Marie Claire.</p>`;
            break;
        case 'dmitry':
            html = `<h2>Портфолио Дмитрия Ефремова</h2>
                <img src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' style='width:100%;max-width:350px;border-radius:16px;margin-bottom:1rem;'>
                <p><b>Commercial, Fashion, Editorial.</b><br>Контракты с агентствами в Европе и Азии. Съёмки для Calvin Klein, Hugo Boss, участие в рекламных роликах.</p>`;
            break;
        case 'alexey':
            html = `<h2>Портфолио Алексея Волкова</h2>
                <img src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' style='width:100%;max-width:350px;border-radius:16px;margin-bottom:1rem;'>
                <p><b>Editorial, Beauty, Runway.</b><br>Постоянный участник fashion-показов в Москве и Санкт-Петербурге. Съёмки для Adidas, Puma, публикации в GQ.</p>`;
            break;
        case 'igor':
            html = `<h2>Портфолио Игоря Морозова</h2>
                <img src='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' style='width:100%;max-width:350px;border-radius:16px;margin-bottom:1rem;'>
                <p><b>Новое лицо, Fashion.</b><br>Перспективный участник fashion-показов. Финалист кастинга FORMA MODELS, съёмки для молодежных брендов.</p>`;
            break;
        default:
            html = '<p>Портфолио не найдено.</p>';
    }
    content.innerHTML = html;
    const modalEl = document.getElementById('portfolioModal');
    modalEl.classList.add('active');
    document.body.classList.add('modal-open');
    // Закрытие по клику вне окна
    modalEl.onclick = function(e) {
        if (e.target === modalEl) closePortfolio();
    };
    // Закрытие по Esc
    document.onkeydown = function(e) {
        if (e.key === 'Escape') closePortfolio();
    };
}
window.openPortfolio = openPortfolio;

function closePortfolio() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.onkeydown = null;
} 