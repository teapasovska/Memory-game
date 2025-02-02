document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission to handle validation
    let isValid = true;

    // Get form fields
    const firstName = document.getElementById("firstname");
    const lastName = document.getElementById("lastname");
    const email = document.getElementById("emailadd");
    const ageUnder18 = document.getElementById("under18");
    const ageAbove18 = document.getElementById("above18");

    // Reset error styles
    firstName.classList.remove("error");
    lastName.classList.remove("error");
    email.classList.remove("error");

    // Validate First Name
    if (firstName.value.trim() === "") {
      firstName.classList.add("error");
      isValid = false;
      alert("First Name is required.");
    }

    // Validate Last Name
    if (lastName.value.trim() === "") {
      lastName.classList.add("error");
      isValid = false;
      alert("Last Name is required.");
    }

    // Validate Email
    if (email.value.trim() === "" || !/\S+@\S+\.\S+/.test(email.value)) {
      email.classList.add("error");
      isValid = false;
      alert("Please enter a valid email address.");
    }

    // Validate Age Selection
    if (!ageUnder18.checked && !ageAbove18.checked) {
      isValid = false;
      alert("Please select your age group.");
    }

    // If all validations pass
    if (isValid) {
      alert("Form submitted successfully!");

      // Clear input fields
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      ageUnder18.checked = false;
      ageAbove18.checked = false;
    }
  });
