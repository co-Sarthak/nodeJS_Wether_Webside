$(document).ready(function() {
    $('#Userlogin').submit(function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      const vemail = $('#email').val();
      const vpassword = $('#password').val();
      let valdata = JSON.stringify({
        email: vemail,
        password: vpassword
      })
      // Make an AJAX POST request
      $.ajax({
        url: '/user/login',
        type: 'POST',
        data: valdata,
        contentType: "application/json",
        processData: false,
        success: function handleFormSubmission(response) {
          if (response.token) {
            // Store the token in localStorage
            localStorage.setItem('userToken', response.token);
          }
            if (response.message) {
              // Display a success toast notification
              Toastify({
                text: response.message,
                duration: 3000,
                destination: "/",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "green",
              }).showToast();
              setTimeout(function() {
                window.location.href = "http://localhost:3000/";
              }, 3000);
            } else if(response.rmessage){
              // Display a risk toast notification
              Toastify({
                text: response.rmessage,
                duration: 3000,
                destination: "/",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
              }).showToast();
            } else {
              // Display a warning toast notification
              Toastify({
                text: response.wrmessage,
                duration: 3000,
                destination: "/",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "orange",
              }).showToast();
            }
          },
        });
    });
});