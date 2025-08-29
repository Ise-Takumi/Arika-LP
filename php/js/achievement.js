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

            // 同じコンテナ内のタブのアクティブ状態を更新
            container.querySelectorAll('.achievement__container-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            
            // コンテンツの表示/非表示を切り替え
            const contentContainer = container.querySelector('.achievement__container-item');
            if (contentContainer) {
                const contents = contentContainer.querySelectorAll('[data-tab-content]');
                contents.forEach(content => {
                    content.classList.remove('active');
                });
                
                const targetContent = contentContainer.querySelector(`[data-tab-content="${target}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    });
}); 