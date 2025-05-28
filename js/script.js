/**
 * Main JavaScript for Calculator Tools Homepage
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all calculator tool items
    const toolItems = document.querySelectorAll('.tool-item');
    const cards = document.querySelectorAll('.card');

    // Add hover effects to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });

    // Add click handlers for tool items without links
    toolItems.forEach(item => {
        // Only add click handler if the item doesn't have an <a> tag
        if (!item.querySelector('a')) {
            item.addEventListener('click', function() {
                // Show coming soon message for tools without links
                alert('This calculator will be available soon!');
            });
        }
    });

    // Optional: Add category filtering
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

    // Optional: Add search functionality
    function searchTools(query) {
        query = query.toLowerCase();
        toolItems.forEach(item => {
            const toolName = item.textContent.toLowerCase();
            const toolCard = item.closest('.card');
            
            if (toolName.includes(query)) {
                item.style.display = 'block';
                if (toolCard) {
                    toolCard.style.display = 'block';
                }
            } else {
                item.style.display = 'none';
                // Only hide card if all its tools are hidden
                if (toolCard) {
                    const visibleTools = toolCard.querySelectorAll('.tool-item[style="display: block"]');
                    if (visibleTools.length === 0) {
                        toolCard.style.display = 'none';
                    }
                }
            }
        });
    }
});
