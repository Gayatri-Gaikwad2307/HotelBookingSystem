
// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Fetch form data
    const formData = new FormData(event.target);

    // Example: Validate form fields (you can add more validation as needed)
    const firstName = formData.get('firstname');
    const lastName = formData.get('lastname');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');

    // Example validation: Check if required fields are empty
    if (!firstName || !lastName || !phone || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Example: Send form data to server (replace with your own logic)
    // Here you can use fetch() or XMLHttpRequest to send data to a server-side script
    console.log('Form data:', {
        firstName,
        lastName,
        phone,
        email,
        message
    });

    // Clear form fields after submission (optional)
    event.target.reset();
}

// Add event listener to the form on submit
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});

