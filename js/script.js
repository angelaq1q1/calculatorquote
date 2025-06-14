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

// Big number calculator
function calculateBigNumberFraction() {
    try {
        const num1 = BigInt(document.getElementById('big-num1').value || '0');
        const den1 = BigInt(document.getElementById('big-den1').value || '1');
        const num2 = BigInt(document.getElementById('big-num2').value || '0');
        const den2 = BigInt(document.getElementById('big-den2').value || '1');
        const operator = document.getElementById('big-operator').value;

        if (den1 === 0n || den2 === 0n) {
            throw new Error("Denominator cannot be zero");
        }

        let resultNum, resultDen;

        switch (operator) {
            case '+':
                resultNum = num1 * den2 + num2 * den1;
                resultDen = den1 * den2;
                break;
            case '-':
                resultNum = num1 * den2 - num2 * den1;
                resultDen = den1 * den2;
                break;
            case '×':
                resultNum = num1 * num2;
                resultDen = den1 * den2;
                break;
            case '÷':
                if (num2 === 0n) {
                    throw new Error("Cannot divide by zero");
                }
                resultNum = num1 * den2;
                resultDen = den1 * num2;
                break;
        }

        // 这里加上约分
        const divisor = gcd(Number(resultNum), Number(resultDen));
        const simplifiedNum = resultNum / BigInt(divisor);
        const simplifiedDen = resultDen / BigInt(divisor);

        document.getElementById('big-result-num').textContent = simplifiedNum.toString();
        document.getElementById('big-result-den').textContent = simplifiedDen.toString();
        document.getElementById('big-number-error').textContent = '';
    } catch (error) {
        document.getElementById('big-result-num').textContent = '?';
        document.getElementById('big-result-den').textContent = '?';
        document.getElementById('big-number-error').textContent = error.message;
    }
} 
