// Charts.js for Tax Calculator

// Function to create tax comparison chart
function createTaxComparisonChart(oldRegimeTax, newRegimeTax) {
    const ctx = document.getElementById('taxComparisonChart').getContext('2d');
    
    // If chart already exists, destroy it
    if (window.taxComparisonChart) {
        window.taxComparisonChart.destroy();
    }
    
    // Create new chart
    window.taxComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Old Regime', 'New Regime'],
            datasets: [{
                label: 'Tax Liability',
                data: [oldRegimeTax, newRegimeTax],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '₹' + context.parsed.y.toLocaleString('en-IN');
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Create tax savings pie chart if there's a difference between regimes
    if (oldRegimeTax !== newRegimeTax) {
        createTaxSavingsPieChart(oldRegimeTax, newRegimeTax);
    }
}

// Function to create tax savings pie chart (not used in this version, but kept for future enhancement)
function createTaxSavingsPieChart(oldRegimeTax, newRegimeTax) {
    // Can be implemented in the future to show a more detailed breakdown
    // of how much is saved in each regime
}