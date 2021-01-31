$(document).ready(() => {

  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // This function is modified from the starter code provided
  // The token is sent from the server side to client side
  function loginUser(email, password) {
    $.post(
      "/api/login",
      {
        email: email,
        password: password
      },
      (data, status) => {
        insertTokenIntoSessionStorage(data.token);
      },
      "json"
    )
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);

        const alert = document.querySelector("#wrong-user-alert");
        alert.classList.remove("hide");
      });
  }

  // The token is stored in local storage on client side
  function insertTokenIntoSessionStorage(token) {
    sessionStorage.setItem("myToken", token);
  }
});
