
document.addEventListener('DOMContentLoaded', function() {
  // Define photoContent variable
  const photoContent = document.getElementById('photoContent');

  // Function to handle file upload
  const uploadForm = document.getElementById('uploadForm');
  if (uploadForm) {
    uploadForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];

      if (!file) {
        alert('Please select a file to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/M00809695/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully:', data);

          // Display the uploaded image
          const img = document.createElement('img');
          img.src = data.filePath;
          photoContent.innerHTML = '';
          photoContent.appendChild(img);
        } else {
          const error = await response.json();
          console.error('Error uploading file:', error.error);
          alert('Error uploading file. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      }
    });
  }

  // Function to handle blog post creation with file upload
  const blogPostForm = document.getElementById('blogPostForm');
  if (blogPostForm) {
    blogPostForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      const blogCaption = document.getElementById('blogCaption').value;

      if (!file) {
        alert('Please select an image to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('blogCaption', blogCaption);

      try {
        const response = await fetch('/M00809695/blog', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Blog post created successfully:', data);

          // Display the uploaded image in the photo box
          const img = document.createElement('img');
          img.src = data.imagePath;
          photoContent.innerHTML = '';
          photoContent.appendChild(img);

          // Update the caption
          const captionElement = document.createElement('span');
          captionElement.textContent = data.blogCaption;
          captionElement.classList.add('blogCaption');
          photoContent.appendChild(captionElement);

          // Clear the form
          blogPostForm.reset();
        } else {
          const error = await response.json();
          console.error('Error creating blog post:', error.error);
          alert('Error creating blog post. Please try again.');
        }
      } catch (error) {
        console.error('Error creating blog post:', error);
        alert('Error creating blog post. Please try again.');
      }
    });
  }
});



// Function to display the modal
function submitComment() {
  var commentText = document.getElementById('commentText').value;
  console.log('Comment submitted:', commentText);
  // Add logic to handle the comment submission as needed
  // Close the comment modal after submission
  closePopup('commentModal');
}

// Function to close the modal
function closePopup(popupId) {
  var modal = document.getElementById(popupId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Function to display the news modal with specific content
function showNewsModal(newsContent) {
  var modal = document.getElementById('newsPopup');
  var newsContentContainer = document.getElementById('newsContent');
  // Set the news content dynamically
  newsContentContainer.innerHTML = newsContent;
  // Display the modal
  modal.style.display = 'block';
}

// Function to display the modal
function showPopup(popupId) {
  var modal = document.getElementById(popupId);
  if (modal) {
    modal.style.display = "block";
    // Example: Displaying specific content for the news modal
    if (popupId === 'newsPopup') {
      var sampleNewsContent = "<p>This is a sample news article.</p>";
      showNewsModal(sampleNewsContent);
    }
  }
}

// User can close the modals by clicking outside of it
window.onclick = function (event) {
  var modals = document.getElementsByClassName('modal');
  for (var i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
    }
  }
};

// Function to handle registration form submission
function handleRegisterFormSubmit() {
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  const email = document.getElementById('newEmail').value;
  const phone = document.getElementById('newPhone').value;
  const age = document.getElementById('newAge').value;

  // Check if the username or email is already taken
  fetch(`http://localhost:9000/M00809695/checkAvailability?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(availability => {
      if (availability.usernameTaken && availability.emailTaken) {
        displayRegistrationMessage('Username and email are already in use. Please choose different ones.', 'red');
      } else if (availability.usernameTaken) {
        displayRegistrationMessage('Username is already in use. Please choose a different one.', 'red');
      } else if (availability.emailTaken) {
        displayRegistrationMessage('Email is already in use. Please use a different one.', 'red');
      } else {
        // User is available, proceed with registration
        const user = {
          username: username,
          password: password,
          email: email,
          phone: phone,
          age: age
        };

        // Send POST request to your web service for registration
        fetch('http://localhost:9000/M00809695/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Registration successful:', data);
            displayRegistrationMessage('Registration successful', 'green');
            // Optionally, you can close the modal here if needed
            // closePopup('registerPopup');
          })
          .catch(error => {
            console.error('Error during registration:', error);
            displayRegistrationMessage('Error during registration. Please try again.', 'red');
          });
      }
    })
    .catch(error => {
      console.error('Error checking availability:', error);
      displayRegistrationMessage('Error during registration. Please try again.', 'red');
    });

  // Prevent the default form submission
  return false;
}

function displayRegistrationMessage(message, color) {
  const registrationMessageElement = document.getElementById('registrationMessage');
  registrationMessageElement.textContent = message;
  registrationMessageElement.style.color = color;
}


// Handle login form submission
function handleLoginFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the entered username and password
  const enteredUsername = document.getElementById("username").value;
  const enteredPassword = document.getElementById("password").value;

  // Make a POST request to your web service for login
  fetch('http://localhost:9000/M00809695/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.valid) {
          // Successful login, handle accordingly
          console.log('Login successful:', data);
          document.getElementById("loginForm").reset();
          displayLoginMessage('Login successful', 'green');
          // Do additional logic if needed for a successful login
      } else {
          // Invalid credentials, display error message
          console.error('Invalid credentials');
          displayLoginMessage('Invalid username or password. Please try again.', 'red');
      }
  })
  .catch(error => {
      console.error('Error during login:', error);
      displayLoginMessage('Error during login. Please try again.', 'red');
  });
}

function displayLoginMessage(message, color) {
  const loginMessageElement = document.getElementById('loginMessage');
  loginMessageElement.innerHTML = message;
  loginMessageElement.style.color = color;
}
