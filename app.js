// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    // Hide resalts
    document.getElementById('results').style.display = 'none';

    //Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results
function calculateResults(){
    console.log('Calculating...');
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPaymnt = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatePayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal*x*calculateInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPaymnt.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = ((monthly * calculatePayments)-principal).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';

        // Hide Loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }
}

// Show Error
function showError(error) {
    //Hide Results
    document.getElementById('results').style.display = 'none';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';

    //creat a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds 
    setTimeout(clearError, 3000);
}

//clear error
function clearError(){
    document.querySelector('.alert').remove();
}