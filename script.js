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
        }, 500);
    });

    // Принудительное скрытие загрузочного экрана через 5 секунд (резерв)
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    }, 5000);
});
