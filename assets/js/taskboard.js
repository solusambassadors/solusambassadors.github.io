class TaskBoard {
    constructor() {
        this.initAccordion();
    }

    initAccordion() {
        const taskItems = document.querySelectorAll('.task-item');
        
        taskItems.forEach(item => {
            const header = item.querySelector('.task-header');
            
            header.addEventListener('click', () => {
                taskItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        });
    }
} 