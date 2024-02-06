$(document).ready(function() {
    $('#Userverify').submit(function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      const votp = $('#otp').val();
      let valdata = JSON.stringify({
        otp: votp
      })
      // console.log(valdata)
      // Make an AJAX POST request

      // Get the user token from localStorage
      var userToken = localStorage.getItem('userToken');

      console.log(userToken);

      $.ajax({
        url: '/user/verifyotp',
        type: 'POST',
        data: valdata,
        contentType: "application/json",
        processData: false,
        //header Bearer Token
        headers: {
          'Authorization': userToken
        },
        success: function handleFormSubmission(response) {
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
          }
        });
    });
});