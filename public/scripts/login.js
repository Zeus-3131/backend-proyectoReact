const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    //console.log(data);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json();
<<<<<<< HEAD
    console.log(response);
    alert(response.message);
    if (response.statusCode === 200) {
      location.replace("/");
      //localStorage.setItem("token", response.token);
    }
=======
    //console.log(response);
    alert(response.message);
    response.session && location.replace("/");
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
  } catch (error) {
    alert(error.message);
  }
});
