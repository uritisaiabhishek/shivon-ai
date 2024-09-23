
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    // Form submit event listener
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      let valid = true;

      // Get form elements
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Reset validation states
      nameInput.classList.remove('is-invalid');
      emailInput.classList.remove('is-invalid');
      messageInput.classList.remove('is-invalid');

      // Name validation
      if (nameInput.value.trim() === '') {
        nameInput.classList.add('is-invalid');
        valid = false;
      }

      // Email validation
      if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        emailInput.classList.add('is-invalid');
        valid = false;
      }

      // Message validation
      if (messageInput.value.trim() === '') {
        messageInput.classList.add('is-invalid');
        valid = false;
      }

      // If form is valid, submit or show success
      if (valid) {
        // Simulate form submission or add real submission logic here
        alert('Form is ready to submit');
      }
    });
  });