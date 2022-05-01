async function main() {
  const res = await fetch("/getUserData");

  const resData = await res.json();

  if (resData.status == "success") {
    document.getElementById("name").innerText = resData.data.name;
  }
}

main();
