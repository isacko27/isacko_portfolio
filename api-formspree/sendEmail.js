var form = document.getElementById("cform");
var successMessage = document.querySelector(".alert-success");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("cform-status");
  var data = new FormData(event.target);

  try {
    var response = await fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      successMessage.style.display = "block";
    } else {
      var responseData = await response.json();
      if (Object.hasOwnProperty.call(responseData, 'errors')) {
        status.innerHTML = responseData.errors.map(error => error.message).join(", ");
      } else {
        status.innerHTML = "Oops! There was a problem submitting your form";
      }
    }
  } catch (error) {
    status.innerHTML = "Oops! There was a problem submitting your form";
  }
}

form.addEventListener("submit", handleSubmit);
