const registerForm = document.getElementById("register");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailNode = document.getElementById("register-email");
  const passwordNode = document.getElementById("register-password");
  const nameNode = document.getElementById("register-name");

  const res = await fetch("/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailNode.value,
      password: passwordNode.value,
      name: nameNode.value,
    }),
  });

  const responseJson = await res.json()

  if (responseJson.status == 'success') {
      console.log("Registered Succesfully")
  } else {
      console.log(responseJson.msg)
  }
});


const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailNode = document.getElementById("login-email");
  const passwordNode = document.getElementById("login-password");

  const res = await fetch("/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailNode.value,
      password: passwordNode.value,
    }),
  });
  const responseJson = await res.json()

  if (responseJson.status == 'success') {
      window.location.href = '/profile'
  }
});
