class TaskBoard {
    constructor() {
        this.initAccordion();
    }

    initAccordion() {
        const taskItems = document.querySelectorAll('.task-item');
        
        taskItems.forEach(item => {
            const header = item.querySelector('.task-header');
            
            header.addEventListener('click', () => {
                // Закрываем все другие открытые элементы
                taskItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Переключаем активный класс для текущего элемента
                item.classList.toggle('active');
            });
        });
    }
} 