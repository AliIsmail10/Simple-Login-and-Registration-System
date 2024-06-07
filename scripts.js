document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logoutButton");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      registerUser();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      loginUser();
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  if (window.location.pathname.includes("home.html")) {
    displayUsername();
  }
});

function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const registerAlert = document.getElementById("registerAlert");

  if (localStorage.getItem(email)) {
    registerAlert.className = "alert alert-error";
    registerAlert.textContent = "Email already exists";
    registerAlert.style.display = "block";
  } else {
    const user = { name, password };
    localStorage.setItem(email, JSON.stringify(user));
    registerAlert.className = "alert alert-success";
    registerAlert.textContent = "User registered successfully";
      registerAlert.style.display = "block";
    // window.location.href = "home.html";
      
  }
}

function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const loginAlert = document.getElementById("loginAlert");

  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    sessionStorage.setItem("loggedInUser", email);
    window.location.href = "home.html";
  } else {
    loginAlert.className = "alert alert-error";
    loginAlert.textContent = "Invalid email or password";
    loginAlert.style.display = "block";
  }
}

function displayUsername() {
  const email = sessionStorage.getItem("loggedInUser");
  const user = JSON.parse(localStorage.getItem(email));

  if (user) {
    document.getElementById("username").textContent = user.name;
  } else {
    window.location.href = "index.html";
  }
}

function logoutUser() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// sessionStorage.clear()