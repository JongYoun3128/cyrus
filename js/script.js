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
