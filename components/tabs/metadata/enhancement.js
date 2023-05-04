window.addEventListener("DOMContentLoaded", () => {
    const tabs = [...document.querySelectorAll('.spectrum-Tabs')];
    tabs.forEach((tabSet => {
        const items = [...tabSet.querySelectorAll('.spectrum-Tabs-item')];
        items.forEach(tabItem => {
            tabItem.addEventListener('click', (event) => {
                // Update selected tab item
                const current = items.find(item => {
                    item.classList.contains('is-selected')
                });
                let currPanelId;
                if (current) {
                    current.classList.remove('is-selected');
                    currPanelId = current.getAttribute('panel-id');
                }

                tabItem.classList.add('is-selected');
                const panelId = tabItem.getAttribute('panel-id');

                // Update matching panel
                if (currPanelId) {
                    const panel = document.querySelector(`#${currPanelId}`);
                    if (panel) panel.classList.remove('is-selected');
                }

                if (panelId) {
                    const panel = document.querySelector(`#${panelId}`);
                    if (panel) panel.classList.remove('is-selected');
                }
            })
        });
    }));
});
