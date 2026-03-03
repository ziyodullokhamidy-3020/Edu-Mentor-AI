// ==================== DOM ELEMENTS ====================
const elements = {
    // Mobile Menu
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    mobileOverlay: document.getElementById('mobileOverlay'),
    mobileLinks: document.querySelectorAll('.mobile-link'),
    
    // Buttons
    loginBtn: document.getElementById('loginBtn'),
    startTestBtn: document.getElementById('startTestBtn'),
    heroStartTest: document.getElementById('heroStartTest'),
    ctaStartTest: document.getElementById('ctaStartTest'),
    loadMoreCareers: document.getElementById('loadMoreCareers'),
    
    // Career filters (jobs page)
    filterBtns: document.querySelectorAll('.filter-btn'),
    careerSearch: document.getElementById('careerSearch'),
    careerCards: document.querySelectorAll('.career-card'),
    
    // Contact form
    contactForm: document.getElementById('contactForm'),
    
    // FAQ
    faqItems: document.querySelectorAll('.faq-item'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),

    // Auth modal
    authOverlay: document.getElementById('authOverlay'),
    authCloseBtn: document.getElementById('authCloseBtn'),
    loginWithGoogle: document.getElementById('loginWithGoogle'),
    loginWithApple: document.getElementById('loginWithApple'),
    loginWithTelegram: document.getElementById('loginWithTelegram'),

    // Tests page elements
    gradeButtons: document.querySelectorAll('.grade-btn'),
    gradeQuestionText: document.getElementById('gradeQuestionText'),
    gradeQuestionBlock: document.getElementById('gradeQuestionBlock'),
    gradeAnswerInput: document.getElementById('gradeAnswerInput'),
    gradeCheckBtn: document.getElementById('gradeCheckBtn'),
    gradeNewQuestionBtn: document.getElementById('gradeNewQuestionBtn'),
    gradeResult: document.getElementById('gradeResult'),
    selectedGradeTitle: document.getElementById('selectedGradeTitle'),
    selectedGradeDescription: document.getElementById('selectedGradeDescription')
};

// ==================== STATE ====================
const state = {
    mobileMenuOpen: false,
    currentGrade: null,
    currentGradeQuestion: null
};

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    
    if (state.mobileMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

function openMobileMenu() {
    if (elements.mobileMenu) {
        elements.mobileMenu.classList.add('active');
    }
    if (elements.mobileOverlay) {
        elements.mobileOverlay.style.display = 'block';
    }
    state.mobileMenuOpen = true;
}

function closeMobileMenu() {
    if (elements.mobileMenu) {
        elements.mobileMenu.classList.remove('active');
    }
    if (elements.mobileOverlay) {
        elements.mobileOverlay.style.display = 'none';
    }
    state.mobileMenuOpen = false;
}

// ==================== CAREER FILTERS ====================
function filterCareers(category) {
    if (!elements.careerCards.length) return;
    
    elements.careerCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Update active button
    elements.filterBtns.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function searchCareers(query) {
    if (!elements.careerCards.length) return;
    
    const searchTerm = query.toLowerCase().trim();
    
    elements.careerCards.forEach(card => {
        const title = card.querySelector('.career-title').textContent.toLowerCase();
        const desc = card.querySelector('.career-desc').textContent.toLowerCase();
        const badge = card.querySelector('.career-badge').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm) || badge.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== FAQ ====================
function toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    elements.faqItems.forEach(faq => {
        faq.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    if (!elements.toast || !elements.toastMessage) return;
    
    elements.toastMessage.textContent = message;
    elements.toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ==================== FORM HANDLERS ====================
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    console.log('Contact form submitted:', formData);
    
    // Show success message
    showToast('Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.', 'success');
    
    // Reset form
    if (elements.contactForm) {
        elements.contactForm.reset();
    }
}

function handleLogin() {
    // Agar modal mavjud bo'lsa, uni ochamiz
    if (elements.authOverlay) {
        elements.authOverlay.classList.add('active');
    } else {
        showToast('Login sahifasi tez orada ishga tushiriladi', 'success');
    }
}

function handleStartTest() {
    // Hozircha umumiy test sahifasi sifatida testlar bo'limiga yo'naltiramiz
    window.location.href = 'tests.html';
}

// ==================== GRADE TESTS (TESTLAR SAHIFASI) ====================
function generateGradeQuestion(grade) {
    grade = parseInt(grade, 10);

    let a, b, c, text, correctAnswer, explanation;

    if (grade <= 6) {
        // 5–6-sinflar: qo'shish/ayirish, kichik ko'paytirish
        a = Math.floor(Math.random() * 40) + 10; // 10–49
        b = Math.floor(Math.random() * 40) + 10;
        const ops = ['+', '-', '×'];
        const op = ops[Math.floor(Math.random() * ops.length)];

        if (op === '+') {
            correctAnswer = a + b;
            text = `${a} + ${b} = ?`;
            explanation = `${a} ga ${b} ni qo‘shamiz: ${a} + ${b} = ${correctAnswer}.`;
        } else if (op === '-') {
            const bigger = Math.max(a, b);
            const smaller = Math.min(a, b);
            correctAnswer = bigger - smaller;
            text = `${bigger} − ${smaller} = ?`;
            explanation = `${bigger} dan ${smaller} ni ayiramiz: ${bigger} − ${smaller} = ${correctAnswer}.`;
        } else {
            const x = Math.floor(Math.random() * 8) + 2; // 2–9
            const y = Math.floor(Math.random() * 8) + 2;
            correctAnswer = x * y;
            text = `${x} × ${y} = ?`;
            explanation = `${x} ni ${y} marta qo‘shsak: ${x} × ${y} = ${correctAnswer}.`;
        }
    } else if (grade <= 9) {
        // 7–9-sinflar: ko'paytirish, bo'lish, 2 qadamli ifodalar
        a = Math.floor(Math.random() * 40) + 20; // 20–59
        b = Math.floor(Math.random() * 30) + 10; // 10–39
        c = Math.floor(Math.random() * 9) + 2;   // 2–10

        const patterns = [
            '(a + b) × c',
            '(a − b) ÷ c',
            'a × c − b',
            'a × b + c'
        ];
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];

        if (pattern === '(a + b) × c') {
            const sum = a + b;
            correctAnswer = sum * c;
            text = `(${a} + ${b}) × ${c} = ?`;
            explanation = `Avval ${a} + ${b} = ${sum}. Keyin ${sum} × ${c} = ${correctAnswer}.`;
        } else if (pattern === '(a − b) ÷ c') {
            const bigger = Math.max(a, b);
            const smaller = Math.min(a, b);
            const diff = bigger - smaller;
            const divisible = diff - (diff % c); // c ga bo'linadigan qism
            correctAnswer = divisible / c;
            text = `${divisible} ÷ ${c} = ?`;
            explanation = `${divisible} ni ${c} ga bo‘lamiz: ${divisible} ÷ ${c} = ${correctAnswer}.`;
        } else if (pattern === 'a × c − b') {
            const mul = a * c;
            correctAnswer = mul - b;
            text = `${a} × ${c} − ${b} = ?`;
            explanation = `Avval ${a} × ${c} = ${mul}. So‘ng ${mul} − ${b} = ${correctAnswer}.`;
        } else {
            const mul = a * c;
            correctAnswer = mul + b;
            text = `${a} × ${c} + ${b} = ?`;
            explanation = `Avval ${a} × ${c} = ${mul}. So‘ng ${mul} + ${b} = ${correctAnswer}.`;
        }
    } else {
        // 10–11-sinflar: biroz murakkabroq arifmetik ifodalar
        a = Math.floor(Math.random() * 30) + 20; // 20–49
        b = Math.floor(Math.random() * 30) + 10; // 10–39
        c = Math.floor(Math.random() * 8) + 2;   // 2–9

        const patterns = [
            '(a + b) × c − a',
            'a × b ÷ c',
            '(a − b) × c + b'
        ];
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];

        if (pattern === '(a + b) × c − a') {
            const sum = a + b;
            const mul = sum * c;
            correctAnswer = mul - a;
            text = `(${a} + ${b}) × ${c} − ${a} = ?`;
            explanation = `1) ${a} + ${b} = ${sum}\n2) ${sum} × ${c} = ${mul}\n3) ${mul} − ${a} = ${correctAnswer}.`;
        } else if (pattern === 'a × b ÷ c') {
            const mul = a * b;
            const divisible = mul - (mul % c);
            correctAnswer = divisible / c;
            text = `${divisible} ÷ ${c} = ?`;
            explanation = `${divisible} ni ${c} ga bo‘lamiz: ${divisible} ÷ ${c} = ${correctAnswer}.`;
        } else {
            const bigger = Math.max(a, b);
            const smaller = Math.min(a, b);
            const diff = bigger - smaller;
            const mul = diff * c;
            correctAnswer = mul + smaller;
            text = `(${bigger} − ${smaller}) × ${c} + ${smaller} = ?`;
            explanation = `1) ${bigger} − ${smaller} = ${diff}\n2) ${diff} × ${c} = ${mul}\n3) ${mul} + ${smaller} = ${correctAnswer}.`;
        }
    }

    return { text, correctAnswer, explanation };
}

function setActiveGradeButton(grade) {
    elements.gradeButtons.forEach(btn => {
        if (btn.dataset.grade === String(grade)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function showGradeQuestion(grade) {
    state.currentGrade = grade;
    state.currentGradeQuestion = generateGradeQuestion(grade);

    if (elements.selectedGradeTitle) {
        elements.selectedGradeTitle.textContent = `${grade}-sinf matematika misollari`;
    }
    if (elements.selectedGradeDescription) {
        elements.selectedGradeDescription.textContent = 'Quyidagi misolni ishlang va javobingizni kiriting. Keyin \"Javobni tekshirish\" tugmasini bosing.';
    }
    if (elements.gradeQuestionText) {
        elements.gradeQuestionText.textContent = state.currentGradeQuestion.text;
    }
    if (elements.gradeQuestionBlock) {
        elements.gradeQuestionBlock.classList.remove('hidden');
    }
    if (elements.gradeAnswerInput) {
        elements.gradeAnswerInput.value = '';
        elements.gradeAnswerInput.focus();
    }
    if (elements.gradeResult) {
        elements.gradeResult.textContent = '';
        elements.gradeResult.classList.remove('success', 'error');
    }

    setActiveGradeButton(grade);
}

function checkGradeAnswer() {
    if (!state.currentGradeQuestion || !elements.gradeAnswerInput || !elements.gradeResult) return;

    const raw = elements.gradeAnswerInput.value.trim().replace(',', '.');
    const value = parseFloat(raw);

    if (Number.isNaN(value)) {
        elements.gradeResult.textContent = 'Iltimos, javobni faqat son bilan kiriting.';
        elements.gradeResult.classList.remove('success');
        elements.gradeResult.classList.add('error');
        return;
    }

    const correct = Math.abs(value - state.currentGradeQuestion.correctAnswer) < 1e-9;

    if (correct) {
        elements.gradeResult.textContent = `Natija: True\nIzoh: To‘g‘ri javob – ${state.currentGradeQuestion.correctAnswer}.\n${state.currentGradeQuestion.explanation}`;
        elements.gradeResult.classList.remove('error');
        elements.gradeResult.classList.add('success');
    } else {
        elements.gradeResult.textContent = `Natija: False\nTo‘g‘ri javob: ${state.currentGradeQuestion.correctAnswer}.\n${state.currentGradeQuestion.explanation}`;
        elements.gradeResult.classList.remove('success');
        elements.gradeResult.classList.add('error');
    }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile menu
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    if (elements.mobileOverlay) {
        elements.mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Mobile links
    elements.mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Action buttons
    if (elements.loginBtn) {
        elements.loginBtn.addEventListener('click', handleLogin);
    }
    if (elements.startTestBtn) {
        elements.startTestBtn.addEventListener('click', handleStartTest);
    }
    if (elements.heroStartTest) {
        elements.heroStartTest.addEventListener('click', handleStartTest);
    }
    if (elements.ctaStartTest) {
        elements.ctaStartTest.addEventListener('click', handleStartTest);
    }
    
    // Career filters
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;
            filterCareers(category);
        });
    });
    
    // Career search
    if (elements.careerSearch) {
        elements.careerSearch.addEventListener('input', (e) => {
            searchCareers(e.target.value);
        });
    }
    
    // Load more careers
    if (elements.loadMoreCareers) {
        elements.loadMoreCareers.addEventListener('click', () => {
            showToast('Ko\'proq kasblar tez orada qo\'shiladi', 'success');
        });
    }
    
    // Contact form
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // FAQ
    elements.faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => toggleFAQ(item));
        }
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu yoki auth modal
        if (e.key === 'Escape') {
            if (state.mobileMenuOpen) {
                closeMobileMenu();
            }
            if (elements.authOverlay) {
                elements.authOverlay.classList.remove('active');
            }
        }
    });

    // Auth modal events
    if (elements.authOverlay) {
        elements.authOverlay.addEventListener('click', (e) => {
            if (e.target === elements.authOverlay) {
                elements.authOverlay.classList.remove('active');
            }
        });
    }

    if (elements.authCloseBtn) {
        elements.authCloseBtn.addEventListener('click', () => {
            if (elements.authOverlay) {
                elements.authOverlay.classList.remove('active');
            }
        });
    }

    // Hozircha ijtimoiy login tugmalari faqat xabar ko'rsatadi
    if (elements.loginWithGoogle) {
        elements.loginWithGoogle.addEventListener('click', () => {
            showToast('Google orqali kirish keyingi bosqichda ulab qo‘yiladi.', 'success');
        });
    }

    if (elements.loginWithApple) {
        elements.loginWithApple.addEventListener('click', () => {
            showToast('Apple account orqali kirish keyingi bosqichda ulab qo‘yiladi.', 'success');
        });
    }

    if (elements.loginWithTelegram) {
        elements.loginWithTelegram.addEventListener('click', () => {
            showToast('Telegram orqali kirish keyingi bosqichda ulab qo‘yiladi.', 'success');
        });
    }

    // Tests page: grade buttons
    if (elements.gradeButtons && elements.gradeButtons.length) {
        elements.gradeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const grade = btn.dataset.grade;
                if (grade) {
                    showGradeQuestion(grade);
                }
            });
        });
    }

    if (elements.gradeCheckBtn) {
        elements.gradeCheckBtn.addEventListener('click', checkGradeAnswer);
    }

    if (elements.gradeNewQuestionBtn) {
        elements.gradeNewQuestionBtn.addEventListener('click', () => {
            if (state.currentGrade) {
                showGradeQuestion(state.currentGrade);
            } else if (elements.gradeButtons.length) {
                const first = elements.gradeButtons[0];
                if (first && first.dataset.grade) {
                    showGradeQuestion(first.dataset.grade);
                }
            }
        });
    }

    console.log('✅ Kelajak.AI platformasi ishga tushdi');
});

// Chatbot funksionalligi
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Ta'limiy AI holati (misollar uchun)
    let currentQuestion = null;
    let waitingForAnswer = false;
    let awaitingContinueAnswer = false;

    function generateMathQuestion() {
        // 1–daraja: oson (2 ta son, + / − / ×)
        // 2–daraja: o‘rta (2 xonali sonlar, bo‘lish, ko‘paytirish)
        // 3–daraja: qiyinroq (2 qadamli ifoda, masalan: (a + b) × c)
        const level = Math.ceil(Math.random() * 3); // 1, 2 yoki 3

        let correctAnswer;
        let text;
        let explanation;

        if (level === 1) {
            const a = Math.floor(Math.random() * 9) + 2;  // 2–10
            const b = Math.floor(Math.random() * 9) + 2;  // 2–10
            const ops = ['+', '-', '×'];
            const op = ops[Math.floor(Math.random() * ops.length)];

            if (op === '+') {
                correctAnswer = a + b;
                text = `${a} + ${b} = ?`;
                explanation = `${a} ga ${b} ni qo‘shamiz: ${a} + ${b} = ${correctAnswer}.`;
            } else if (op === '-') {
                const bigger = Math.max(a, b);
                const smaller = Math.min(a, b);
                correctAnswer = bigger - smaller;
                text = `${bigger} − ${smaller} = ?`;
                explanation = `${bigger} dan ${smaller} ni ayiramiz: ${bigger} − ${smaller} = ${correctAnswer}.`;
            } else {
                correctAnswer = a * b;
                text = `${a} × ${b} = ?`;
                explanation = `${a} ni ${b} marta qo‘shsak: ${a} + ... (${b} marta) = ${correctAnswer}.`;
            }
        } else if (level === 2) {
            // 2–daraja: kattaroq sonlar va bo‘lish
            const a = Math.floor(Math.random() * 40) + 20; // 20–59
            const bOptions = [2, 3, 4, 5, 6, 8, 10];
            const b = bOptions[Math.floor(Math.random() * bOptions.length)];
            const ops = ['×', '÷'];
            const op = ops[Math.floor(Math.random() * ops.length)];

            if (op === '×') {
                correctAnswer = a * b;
                text = `${a} × ${b} = ?`;
                explanation = `${a} sonini ${b} marta ko‘paytiramiz: ${a} × ${b} = ${correctAnswer}.`;
            } else {
                const multiple = a - (a % b); // bo‘linadigan son
                correctAnswer = multiple / b;
                text = `${multiple} ÷ ${b} = ?`;
                explanation = `${multiple} ni ${b} ga bo‘lamiz: ${multiple} ÷ ${b} = ${correctAnswer}.`;
            }
        } else {
            // 3–daraja: 2 qadamli ifoda
            const a = Math.floor(Math.random() * 20) + 5;   // 5–24
            const b = Math.floor(Math.random() * 20) + 5;   // 5–24
            const c = Math.floor(Math.random() * 9) + 2;    // 2–10

            const patterns = [
                '(a + b) × c',
                '(a − b) × c',
                'a × b − c',
                'a × b + c'
            ];
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];

            if (pattern === '(a + b) × c') {
                const sum = a + b;
                correctAnswer = sum * c;
                text = `(${a} + ${b}) × ${c} = ?`;
                explanation = `Avval ${a} + ${b} = ${sum}. Keyin ${sum} × ${c} = ${correctAnswer}.`;
            } else if (pattern === '(a − b) × c') {
                const bigger = Math.max(a, b);
                const smaller = Math.min(a, b);
                const diff = bigger - smaller;
                correctAnswer = diff * c;
                text = `(${bigger} − ${smaller}) × ${c} = ?`;
                explanation = `Avval ${bigger} − ${smaller} = ${diff}. Keyin ${diff} × ${c} = ${correctAnswer}.`;
            } else if (pattern === 'a × b − c') {
                const mul = a * b;
                correctAnswer = mul - c;
                text = `${a} × ${b} − ${c} = ?`;
                explanation = `Avval ${a} × ${b} = ${mul}. So‘ng ${mul} dan ${c} ni ayiramiz: ${mul} − ${c} = ${correctAnswer}.`;
            } else {
                const mul = a * b;
                correctAnswer = mul + c;
                text = `${a} × ${b} + ${c} = ?`;
                explanation = `Avval ${a} × ${b} = ${mul}. So‘ng ${mul} ga ${c} ni qo‘shamiz: ${mul} + ${c} = ${correctAnswer}.`;
            }
        }

        return {
            text,
            correctAnswer,
            explanation
        };
    }

    // Chatni ochish/yopish
    chatbotToggle.addEventListener('click', function() {
        chatbotWindow.classList.add('active');
        chatbotInput.focus();
    });

    chatbotClose.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
    });

    // Xabar yuborish
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Foydalanuvchi xabarini qo'shish
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Ta'limiy AI javobi (misolni tekshirish yoki yangi misol berish)
        setTimeout(() => {
            handleUserMessage(message);
        }, 600);
    }

    // Xabar qo'shish
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scrollni pastga tushirish
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Ta'limiy savollarga (matematika, ingliz tili va hokazo) javob berish
    function answerEducationalQuestion(userMessage) {
        const lower = userMessage.toLowerCase();

        // Matematika haqida umumiy savollar
        if (lower.includes('matematika nima')) {
            return 'Matematika — sonlar, shakllar va ularning o‘zaro bog‘lanishini o‘rganadigan fan. U orqali hisob-kitob qilish, masalalar yechish va mantiqiy fikrlashni o‘rganamiz.';
        }
        if (lower.includes('matematika')) {
            return 'Matematika — kundalik hayotda juda kerak bo‘ladigan fan: pul sanash, vaqtni hisoblash, biznes yuritish, texnika va IT sohasida ham matematika asos bo‘lib xizmat qiladi.';
        }

        // Ingliz tili haqida
        if (lower.includes('ingliz') && lower.includes('tili nima')) {
            return 'Ingliz tili — dunyoda eng ko‘p ishlatiladigan tillardan biri. Ilm-fan, biznes, dasturlash va internetdagi ko‘plab maʼlumotlar ingliz tilida bo‘ladi.';
        }
        if (lower.includes('ingliz') && (lower.includes('bor') || lower.includes('o\'rgat'))) {
            return 'Ha, men ingliz tili bo‘yicha ham yordam bera olaman: grammatik qoidalar, so‘z yodlash usullari va misollar bilan tushuntirib beraman.';
        }
        if (lower.includes('present simple')) {
            return 'Present Simple — hozirgi oddiy zamon. Odatdagi, takrorlanuvchi ish-harakatlar uchun ishlatiladi: \"I go to school every day\". Fe’l odatda -s qo‘shimchasini faqat he/she/it bilan oladi: \"He works\", \"She plays\".';
        }

        // Kasb tanlash, o‘qish haqida
        if (lower.includes('kasb') || lower.includes('professiya')) {
            return 'Kasb tanlashda 3 narsani o‘ylash kerak: qiziqishingiz, qobiliyatingiz va bozor talabi. Siz nimaga qiziqasiz? Raqamlar, odamlar bilan ishlash yoki texnologiyami?';
        }
        if (lower.includes('qanday o\'qish') || lower.includes('qanday o\'qish kerak') || lower.includes('qanday o‘qish')) {
            return 'Samarali o‘qish uchun: 1) Katta mavzuni kichik bo‘laklarga bo‘ling. 2) Har kuni kamida 30–60 daqiqa muntazam takror qiling. 3) Faqat o‘qib chiqmay, misol va mashqlar bajaring.';
        }

        // Umumiy ta'limiy savollar
        if (lower.includes('nima') || lower.includes('qanday') || lower.includes('?')) {
            return 'Bu savol taʼlimga oid bo‘lsa, iloji boricha sodda qilib tushuntiraman. Iltimos, savolingizni biroz aniqlab yozing, masalan: \"Matematika nima uchun kerak?\" yoki \"Ingliz tilini qayerdan boshlab o‘rgansam bo‘ladi?\"';
        }

        // Default javob – faqat ta'lim doirasida ishlashini eslatish
        return 'Men taʼlimiy savollarga javob beraman: matematika, ingliz tili, kasb tanlash, o‘qish strategiyalari va shunga o‘xshash mavzular. Savolingizni shu yo‘nalishlardan birida aniqroq qilib yozing.';
    }

    // Foydalanuvchi javobini tekshirish va yangi misol berish
    function handleUserMessage(userMessage) {
        const lower = userMessage.toLowerCase();

        // Avval davom ettirishga javobni tekshiramiz
        if (awaitingContinueAnswer) {
            if (
                lower.includes("yo'q") ||
                lower.includes('yo‘q') ||
                lower.includes('yoq') ||
                lower.includes('kerak emas') ||
                lower.includes('stop')
            ) {
                awaitingContinueAnswer = false;
                waitingForAnswer = false;
                currentQuestion = null;
                addMessage('Xo‘p, hozircha misollarni to‘xtatdim. Qachon xohlasangiz, "yangi misol" deb yozing va davom etamiz.', 'bot');
                return;
            }

            if (
                lower.includes('ha') ||
                lower.includes('yangi misol') ||
                lower.includes('yana misol') ||
                (lower.includes('yana') && lower.includes('misol'))
            ) {
                awaitingContinueAnswer = false;
                addMessage('Yangi misol beraman:', 'bot');
                startNewQuestion();
                return;
            }

            // Noma'lum javob bo‘lsa, aniqlik kiritamiz
            addMessage('Iltimos, "ha" yoki "yo‘q" deb javob bering. Yoki "yangi misol" deb yozsangiz, davom etamiz.', 'bot');
            return;
        }

        // Foydalanuvchi aniq "yangi misol" so‘rasa – har doim beramiz
        if (
            lower.includes('yangi misol') ||
            lower.includes('yana misol') ||
            (lower.includes('yana') && lower.includes('misol'))
        ) {
            addMessage('Yangi misol beraman:', 'bot');
            startNewQuestion();
            return;
        }

        // Agar hozircha misol kutmayotgan bo‘lsak va matn savolga o‘xshasa – ta'limiy javob beramiz
        if (!waitingForAnswer && !currentQuestion) {
            // Agar "misol", "mashq" kabilar bo‘lmasa, umumiy ta'limiy savol deb qabul qilamiz
            if (
                !lower.includes('misol') &&
                (lower.includes('nima') ||
                 lower.includes('qanday') ||
                 lower.includes('ingliz') ||
                 lower.includes('matematika') ||
                 lower.includes('?'))
            ) {
                const eduAnswer = answerEducationalQuestion(userMessage);
                addMessage(eduAnswer, 'bot');
                return;
            }
        }

        // Agar hozircha misol bo‘lmasa va foydalanuvchi shunchaki so‘rasa
        if (!waitingForAnswer || !currentQuestion) {
            if (lower.includes('misol') || lower.includes('mashq') || lower.includes('matematika')) {
                addMessage('Keling, birga misol ishlaymiz. Mana siz uchun misol:', 'bot');
                startNewQuestion();
            } else {
                const eduAnswer = answerEducationalQuestion(userMessage);
                addMessage(eduAnswer, 'bot');
            }
            return;
        }

        // Foydalanuvchi javobini son qilib o‘qiymiz
        const normalized = userMessage.replace(',', '.');
        const userNumber = parseFloat(normalized);

        if (Number.isNaN(userNumber)) {
            addMessage('Iltimos, javobni faqat son bilan kiriting (masalan: 24).', 'bot');
            return;
        }

        const isCorrect = Math.abs(userNumber - currentQuestion.correctAnswer) < 1e-9;

        if (isCorrect) {
            addMessage(`Natija: True ✅\nIzoh: To‘g‘ri javob – ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`, 'bot');
        } else {
            addMessage(`Natija: False ❌\nIzoh: To‘g‘ri javob – ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`, 'bot');
        }

        waitingForAnswer = false;
        awaitingContinueAnswer = true;

        // Yangi misol taklif qilamiz
        setTimeout(() => {
            addMessage('Yana bir misol ishlashni xohlaysizmi? Agar ha bo‘lsa, "ha" yoki "yangi misol" deb yozing. Agar xohlamasangiz, "yo‘q" deb yozishingiz mumkin.', 'bot');
        }, 600);
    }

    function startNewQuestion() {
        currentQuestion = generateMathQuestion();
        waitingForAnswer = true;
        awaitingContinueAnswer = false;
        addMessage(`Misol: ${currentQuestion.text}\nJavobingizni kiriting (faqat son yozing).`, 'bot');
    }

    // Tugmalar
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Chat ochilganda birinchi ta'limiy misolni avtomatik taklif qilish
    if (chatbotMessages) {
        setTimeout(() => {
            addMessage('Keling, siz bilan matematika bo‘yicha kichik mashq qilamiz.', 'bot');
            startNewQuestion();
        }, 800);
    }
});