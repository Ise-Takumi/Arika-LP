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