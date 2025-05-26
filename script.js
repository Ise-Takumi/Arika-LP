document.addEventListener('DOMContentLoaded', function () {
    const tabItems = document.querySelectorAll('.achievement__list-item');
    const tabContents = document.querySelectorAll('.achievement__container');

    tabItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all tab items
            tabItems.forEach(i => i.classList.remove('active'));
            // Add active class to the clicked item
            this.classList.add('active');

            const targetTab = this.getAttribute('data-tab');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show the target tab content
            const activeContent = document.querySelector(`.achievement__container[data-tab-target="${targetTab}"]`);
            if (activeContent) {
                activeContent.classList.remove('hidden');
            }
        });
    });
}); 

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq__container-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__container-item-question');
        const answer = item.querySelector('.faq__container-item-answer');
        const button = item.querySelector('.faq__container-item-question-button');
        
        question.addEventListener('click', () => {
            // クリックされたアイテムの開閉を切り替え
            answer.classList.toggle('active');
            button.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerButton = document.querySelector('.header__hamburger-button');
    const hamburger = document.querySelector('.header__hamburger');
    const hamburgerNav = document.querySelector('.header__nav');
    const hamburgerContainer = document.querySelector('.header__hamburger-container');

    hamburgerButton.addEventListener('click', function () {
        hamburgerContainer.classList.toggle('active');
        hamburgerNav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 実績セクションのタブ切り替え
    const achievementTabs = document.querySelectorAll('.achievement__container-tab');
    
    achievementTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            const container = tab.closest('.achievement__container');
            
            container.querySelectorAll('.achievement__container-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            
            const contentContainer = container.querySelector('.achievement__container-item');
            contentContainer.querySelectorAll('[data-tab-content]').forEach(content => {
                content.classList.remove('active');
            });
            contentContainer.querySelector(`[data-tab-content="${target}"]`).classList.add('active');
        });
    });
});

