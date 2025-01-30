   // Initialize EmailJS with your User ID
   //emailjs.init('Dev'); // Replace with your EmailJS User ID

   document.getElementById('contactForm').addEventListener('submit', function (event) {
       event.preventDefault(); // Prevent the default form submission

       // Get form data
       const formData = new FormData(event.target);
       const data = {
           name: formData.get('name'),
           email: formData.get('email'),
           message: formData.get('message'),
       };

       // Basic validation
       if (!data.name || !data.email || !data.message) {
           alert('Please fill out all fields.');
           return;
       }

       // Send email using EmailJS
       emailjs.send('service_evqrkew', 'template_udforj7', data) // Replace with your Service ID and Template ID
           .then((response) => {
               // Display success message
               alert('Message sent successfully!');
               console.log('EmailJS Response:', response);
               event.target.reset(); // Clear the form
           })
           .catch((error) => {
               // Display error message
               alert('Failed to send message. Please try again.');
               console.error('EmailJS Error:', error);
           });
   });