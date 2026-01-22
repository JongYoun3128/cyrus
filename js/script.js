// 햄버거 메뉴 토글
const hamburgerBtn = document.getElementById('hamburgerBtn');
const headerMenu = document.getElementById('headerMenu');

if (hamburgerBtn && headerMenu) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        headerMenu.classList.toggle('active');
    });

    // 메뉴 링크 클릭시 메뉴 닫기
    const menuLinks = headerMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            headerMenu.classList.remove('active');
        });
    });

    // 메뉴 외부 클릭시 닫기
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !headerMenu.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            headerMenu.classList.remove('active');
        }
    });
}

// Detail Image Swiper 초기화 (lazy loading 최적화)
const detailSwiper = new Swiper(".detail-img", {
    // 슬라이드 간격
    spaceBetween: 30,
    // 자동 재생
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    // 루프 모드
    loop: true,
    // 속도
    speed: 600,
    // lazy loading
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
    },
    // 페이지네이션
    pagination: {
        el: ".detail-img .swiper-pagination",
        clickable: true,
    },
    // 네비게이션 버튼
    navigation: {
        nextEl: ".detail-img .swiper-button-next",
        prevEl: ".detail-img .swiper-button-prev",
    },
    // 반응형 설정
    breakpoints: {
        // 모바일
        320: {
            slidesPerView: 1,
        },
        // 태블릿
        768: {
            slidesPerView: 1,
        },
        // 데스크탑
        1024: {
            slidesPerView: 1,
        },
    },
});

// Point List Swiper 초기화 (성능 최적화)
const pointSwiper = new Swiper(".point-list", {
    // 슬라이드 개수
    slidesPerView: 1,
    // 중앙 정렬
    centeredSlides: true,
    // 슬라이드 간격
    spaceBetween: 30,
    // 자동 재생
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    // 루프 모드
    loop: true,
    // 속도
    speed: 800,
    // lazy loading
    lazy: true,
    // 페이지네이션
    pagination: {
        el: ".point-list .swiper-pagination",
        clickable: true,
    },
    // 네비게이션 버튼
    navigation: {
        nextEl: ".point-list .swiper-button-next",
        prevEl: ".point-list .swiper-button-prev",
    },
    // 슬라이드 효과
    effect: "slide",
});

// 스크롤 애니메이션 - Intersection Observer (최적화)
const animateElements = document.querySelectorAll('.animate');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // requestAnimationFrame으로 성능 최적화
            requestAnimationFrame(() => {
                entry.target.classList.add('show');
            });
            // 한 번 보이면 관찰 중지 (성능 향상)
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    observer.observe(element);
});

// 모바일에서 box-list 가로 무한 루프를 위한 복제
function setupInfiniteScroll() {
    const boxList = document.querySelector('.box-list');
    if (!boxList) return;

    // 모바일인지 체크
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function duplicateItems() {
        if (isMobile()) {
            // 이미 복제된 항목이 있는지 확인
            const clonedItems = boxList.querySelectorAll('.cloned');
            if (clonedItems.length > 0) return;

            // 원본 li 요소들 가져오기
            const items = boxList.querySelectorAll('li:not(.cloned)');
            
            // 가로 무한 루프를 위해 2번만 복제
            for (let i = 0; i < 2; i++) {
                items.forEach(item => {
                    const clone = item.cloneNode(true);
                    clone.classList.add('cloned');
                    boxList.appendChild(clone);
                });
            }
        }
    }

    function removeClones() {
        const clonedItems = boxList.querySelectorAll('.cloned');
        clonedItems.forEach(item => item.remove());
    }

    // 초기 실행
    duplicateItems();

    // 윈도우 리사이즈 시 처리 (디바운스로 성능 최적화)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            requestAnimationFrame(() => {
                if (isMobile()) {
                    removeClones();
                    duplicateItems();
                } else {
                    removeClones();
                }
            });
        }, 300);
    });
}

// DOM 로드 후 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupInfiniteScroll);
} else {
    setupInfiniteScroll();
}

// 맨 위로 스크롤 버튼
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    // 초기 상태 숨기기
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
    
    // 스크롤 이벤트 (throttle로 성능 최적화)
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (!scrollTimer) {
            scrollTimer = setTimeout(() => {
                scrollTimer = null;
                requestAnimationFrame(() => {
                    if (window.pageYOffset > 300) {
                        scrollToTopBtn.style.opacity = '1';
                        scrollToTopBtn.style.visibility = 'visible';
                    } else {
                        scrollToTopBtn.style.opacity = '0';
                        scrollToTopBtn.style.visibility = 'hidden';
                    }
                });
            }, 100);
        }
    });
    
    // 클릭 이벤트
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}