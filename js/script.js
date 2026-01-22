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

// Detail Image Swiper 초기화
const detailSwiper = new Swiper(".detail-img", {
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

// Point List Swiper 초기화
const pointSwiper = new Swiper(".point-list", {
    // 슬라이드 개수
    slidesPerView: 1,
    // 중앙 정렬
    centeredSlides: true,
    // 슬라이드 간격
    spaceBetween: 30,
    // 자동 재생
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    // 루프 모드
    loop: true,
    // 속도
    speed: 1000,
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

// 스크롤 애니메이션 - Intersection Observer
const animateElements = document.querySelectorAll('.animate');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
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

    // 윈도우 리사이즈 시 처리
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (isMobile()) {
                removeClones(); // 기존 복제 제거
                duplicateItems(); // 새로 복제
            } else {
                removeClones();
            }
        }, 250);
    });
}

// DOM 로드 후 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupInfiniteScroll);
} else {
    setupInfiniteScroll();
}