const form = document.getElementById("register");

form.addEventListener("submit", async (e) => {
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
});
