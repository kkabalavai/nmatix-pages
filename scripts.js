document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const data = {
            domain_id: '0001',
            form_id: '0001',
            name: name,
            email: email,
            message: message
        };

        fetch('https://d8uip92nhf.execute-api.ap-south-2.amazonaws.com/prod/form/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response Data:', data);
            const referenceNumber = `#${data.id}`;
            form.reset();
            form.style.display = 'none';
            formMessage.style.display = 'block';
            formMessage.innerHTML = `<p>Thank you for your message! We’ll get back to you soon. <br><br>Reference Number: ${referenceNumber}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            form.style.display = 'none';
            formMessage.style.display = 'block';
            formMessage.innerHTML = '<p>There was an error submitting the form. Please try again later.</p>';        });
    });
});