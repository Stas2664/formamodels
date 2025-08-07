// Safe loader with fallback
window.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressFill  = document.getElementById('progressFill');
  const progressText  = document.getElementById('progressText');
  let progress = 0, timer = null;

  function setProgress(val){
    if (progressFill) progressFill.style.width = val + '%';
    if (progressText) progressText.textContent = val + '%';
  }

  // Fake progress to 90%
  timer = setInterval(() => {
    if (progress < 90){
      progress += Math.floor(Math.random()*5)+1;
      if (progress > 90) progress = 90;
      setProgress(progress);
    } else {
      clearInterval(timer);
    }
  }, 40);

  // Close on real load
  window.addEventListener('load', () => {
    setProgress(100);
    setTimeout(() => loadingScreen && loadingScreen.classList.add('hidden'), 400);
  });

  // Fallback after 5s
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
    }
  }, 5000);
});
