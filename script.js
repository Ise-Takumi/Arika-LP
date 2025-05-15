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
        item.addEventListener('click', function () {
            const question = item.querySelector('.faq__container-item-question');
            const answer = item.querySelector('.faq__container-item-answer');

            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
});
