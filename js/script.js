/**
 * Main JavaScript for Calculator Tools Homepage
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all calculator tool items
    const toolItems = document.querySelectorAll('.tool-item');
    const cards = document.querySelectorAll('.card');

    // Add click handlers only for items without links
    toolItems.forEach(item => {
        // Check if the item has no anchor tag inside
        if (!item.querySelector('a')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function(e) {
                // Prevent event from bubbling if the item was clicked directly
                if (e.target === this) {
                    alert('This calculator will be available soon!');
                }
            });
        }
    });

    // Optional: Add search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            toolItems.forEach(item => {
                const toolName = item.textContent.toLowerCase();
                if (toolName.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});
