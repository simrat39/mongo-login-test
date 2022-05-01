async function main() {
  const res = await fetch("/getUserData");

  const resData = await res.json();

  if (resData.status == "success") {
    document.getElementById("name").innerText = resData.data.name;
  }

  const logout = document.getElementById("logout")
  logout.addEventListener("click", async () => {
      const res = await fetch("/logout")
      const resData = await res.json()

      if (resData.status == 'success') {
          window.location.href = "/"
      } else {
          console.log("Error occured")
      }
  })
}

main();
