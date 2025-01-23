// Navigate to the homepage (index page)
function goToHome() {
    window.location.href = '/'; // Redirect to the homepage (adjust the URL as needed)
}

// Navigate back to the previous page
function goBack() {
    window.history.back(); // Navigate the user back to the previous page
}

// Navigate to the specified department
function navigateTo(departmentPath) {
    const basePath = "Departments"; // Base path for all department HTML files
    const targetPath = `${basePath}/${departmentPath}.html`; // Construct the target path

    // Redirect to the target path
    window.location.href = targetPath;
}

// Toggle video player visibility
function toggleVideoPlayer() {
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.style.display = videoPlayer.style.display === "none" ? "block" : "none"; // Toggle between visible and hidden states
}

// Function to generate a unique Trip ID
function generateTripID() {
    return 'TRIP-' + new Date().getTime(); // Generates a unique Trip ID based on the current timestamp
}

// Handle form submission and generate Trip ID
document.getElementById('fleet-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Generate a unique Trip ID
    const tripID = generateTripID();
    document.getElementById('trip-id').value = tripID; // Set the Trip ID in the form field

    // Optionally, you can handle form data submission to a server here
    alert("Trip submitted successfully with Trip ID: " + tripID);
});

// Show/Hide specific fields based on selected trip type
document.getElementById("trip-type").addEventListener("change", function() {
    var selectedType = this.value; // Get the selected trip type

    // Hide all trip detail sections first
    document.querySelectorAll('.trip-details').forEach(function(div) {
        div.style.display = 'none';
    });

    // Show the relevant trip details based on the selected type
    if (selectedType === "funerals") {
        document.getElementById("funeral-fields").style.display = 'block';
    } else if (selectedType === "finance") {
        document.getElementById("finance-fields").style.display = 'block';
    } else if (selectedType === "marketing") {
        document.getElementById("marketing-fields").style.display = 'block';
    } else if (selectedType === "operations") {
        document.getElementById("operations-fields").style.display = 'block';
    }
});

// Show/Hide specific fields based on department selection (for operations trip)
document.getElementById("operations-department").addEventListener("change", function() {
    var selectedDepartment = this.value; // Get the selected department

    // Hide all operations trip detail sections first
    document.querySelectorAll('.operations-details').forEach(function(div) {
        div.style.display = 'none';
    });

    // Show the relevant department details based on the selected department
    if (selectedDepartment === "business-admin") {
        document.getElementById("business-admin-fields").style.display = 'block';
    } else if (selectedDepartment === "projects") {
        document.getElementById("projects-fields").style.display = 'block';
    } else if (selectedDepartment === "human-resources") {
        document.getElementById("human-resources-fields").style.display = 'block';
    }
});

// Toggle visibility of fields related to premium collections under Finance
document.getElementById("finance-category").addEventListener("change", function() {
    var category = this.value; // Get the selected finance category

    // Show/Hide fields based on finance category
    if (category === "premium-collections") {
        document.getElementById("premium-collections-fields").style.display = 'block';
    } else {
        document.getElementById("premium-collections-fields").style.display = 'none';
    }
});

// Toggle the "Date of Payout" field based on cash claim selection
document.addEventListener("DOMContentLoaded", function() {
    var cashClaimSelect = document.getElementById("is-cash-claim");
    var payoutDateGroup = document.getElementById("payout-date-group");

    // Check if the cash claim option is selected and toggle the display of the payout date field
    cashClaimSelect.addEventListener("change", function() {
        if (this.value === "yes") {
            payoutDateGroup.style.display = "block"; // Show the "Date of Payout" field if "Yes" is selected
        } else {
            payoutDateGroup.style.display = "none"; // Hide the "Date of Payout" field if "No" is selected
        }
    });

    // Initial check on page load in case the value is already set
    if (cashClaimSelect.value === "yes") {
        payoutDateGroup.style.display = "block";
    } else {
        payoutDateGroup.style.display = "none";
    }
});

// Functionality for the Finance Requisition Form
document.addEventListener("DOMContentLoaded", function() {
    const addItemButton = document.getElementById("add-item");
    const itemsTable = document.getElementById("items-table").getElementsByTagName('tbody')[0];

    // Function to add a new row to the items table
    addItemButton.addEventListener("click", function() {
        const newRow = itemsTable.insertRow();
        
        // Add input cells to the new row
        for (let i = 0; i < 5; i++) {
            const newCell = newRow.insertCell(i);
            if (i === 0) {
                newCell.innerHTML = '<input type="text" name="item[]" required>';
            } else if (i === 1) {
                newCell.innerHTML = '<input type="number" name="quantity[]" class="quantity" required>';
            } else if (i === 2) {
                newCell.innerHTML = '<input type="text" name="description[]">';
            } else if (i === 3) {
                newCell.innerHTML = '<input type="number" name="unit-price[]" class="unit-price" required>';
            } else if (i === 4) {
                newCell.innerHTML = '<input type="number" name="total[]" class="total" disabled>';
            }
        }
        
        // Add "Remove" button to the new row
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-item');
        removeButton.addEventListener('click', function() {
            itemsTable.deleteRow(newRow.rowIndex);
        });
        newRow.appendChild(removeButton);
    });

    // Event listener for item quantity or unit price change to recalculate the total
    itemsTable.addEventListener('input', function(event) {
        if (event.target.classList.contains('quantity') || event.target.classList.contains('unit-price')) {
            const row = event.target.closest('tr');
            const quantity = row.querySelector('.quantity').value || 0;
            const unitPrice = row.querySelector('.unit-price').value || 0;
            const totalCell = row.querySelector('.total');

            // Calculate the total
            totalCell.value = (quantity * unitPrice).toFixed(2);
        }
    });
});
