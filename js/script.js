// DOM이 로드된 후 실행될 초기화 함수
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollEvents();
    initializeSmoothScroll();
    initializeScrollAnimation();
    initializeProjectCards();
    updateFooterYear();
    initializeLoadAnimation();
});

// 스크롤 이벤트 초기화
function initializeScrollEvents() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        // 네비게이션 바 스타일 변경
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // 현재 섹션에 따른 메뉴 활성화
        updateActiveNavLink();
    });
}

// 스무스 스크롤 초기화
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 스크롤 애니메이션 초기화
function initializeScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 관찰할 요소들 선택 및 설정
    const animatedElements = document.querySelectorAll(
        '.project-card, .about-content, .contact-content, .skill-tag'
    );

    animatedElements.forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 프로젝트 카드 이벤트 초기화
function initializeProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // 프로젝트 링크 클릭 이벤트
        const links = card.querySelectorAll('.project-link');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // 외부 링크인 경우에만 새 탭에서 열기
                if (!this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    window.open(this.href, '_blank');
                }
            });
        });
    });
}

// 현재 스크롤 위치에 따른 메뉴 활성화
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // 현재 보고 있는 섹션 확인
        if (window.scrollY >= sectionTop - 100 && 
            window.scrollY < sectionTop + sectionHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    // 해당하는 네비게이션 링크 활성화
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 푸터 연도 업데이트
function updateFooterYear() {
    const yearElement = document.querySelector('.footer p');
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; ${currentYear} [당신의 이름]. All rights reserved.`;
}

// 페이지 로드 애니메이션 초기화
function initializeLoadAnimation() {
    document.body.classList.add('loaded');
    
    // 히어로 섹션 텍스트 애니메이션
    const heroElements = document.querySelectorAll('.hero .animate-text');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 스킬 태그 애니메이션
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// 컨택트 아이템 호버 효과
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// 모바일 메뉴 토글 기능 (필요한 경우)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}