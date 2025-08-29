document.addEventListener('DOMContentLoaded', function () {
    // メインタブの切り替え
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

    // サブタブの切り替え
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