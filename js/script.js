/**
 * Calculator Tools JavaScript
 * Handles all interactive features of the calculator tools website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all calculator tools
    const toolItems = document.querySelectorAll('.tool-item');
    const cards = document.querySelectorAll('.card');

    // Add click event listeners to all tool items
    toolItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all tools
            toolItems.forEach(tool => tool.classList.remove('active'));
            // Add active class to clicked tool
            this.classList.add('active');
            
            // Show a message when a calculator is clicked
            const toolName = this.textContent;
            const categoryName = this.closest('.card').querySelector('h2').textContent;
            alert(`Opening ${toolName} from ${categoryName}`);
        });
    });

    // Add hover effects to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add highlight class to card
            this.classList.add('highlight');
        });

        card.addEventListener('mouseleave', function() {
            // Remove highlight class from card
            this.classList.remove('highlight');
        });
    });

    // Search functionality (can be implemented later)
    function searchTools(query) {
        const toolItems = document.querySelectorAll('.tool-item');
        query = query.toLowerCase();

        toolItems.forEach(item => {
            const toolName = item.textContent.toLowerCase();
            if (toolName.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Category filtering (can be implemented later)
    function filterByCategory(category) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
