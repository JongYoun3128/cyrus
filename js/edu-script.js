// 슬라이드 네비게이션
let currentSlide = 1;
const totalSlides = 7;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    
    if (n > totalSlides) {
        currentSlide = totalSlides;
    }
    if (n < 1) {
        currentSlide = 1;
    }
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    slides[currentSlide - 1].classList.add('active');
    document.getElementById('currentSlide').textContent = currentSlide;
    
    // 버튼 활성화/비활성화
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
}

function nextSlide() {
    currentSlide++;
    if (currentSlide > totalSlides) {
        currentSlide = totalSlides;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 1) {
        currentSlide = 1;
    }
    showSlide(currentSlide);
}

// 이벤트 리스너
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// 키보드 네비게이션
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    }
});

// 초기 슬라이드 표시
showSlide(1);
