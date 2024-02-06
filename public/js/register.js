//Client Side js
$(document).ready(function() {
    $('#userregistor').submit(function(event) {
      event.preventDefault(); // Prevent the default form submission behavior
      // console.log(alldata)
      // var x = document.forms["userregistor"]["name"].value;
      
      // Get form data
      const formData = new FormData(this);
      console.log(formData);
      // var newname = $("#name").val();
      // console.log(newname);
      // const x = formData.get('#name');
      // const s = formData.get('#phoneno');
      // const s = formData.$('#email').val();
      // console.log(x);
      // console.log(s);
      
      // if (x == "") {
      //   // alert("Name must be filled out");
      //   $('#error-name').text("Name Field Must Be Filled");
      // }
      // This Will Show formData Structure and Properties of formData
      // console.log(formData)
      // This Will Display Key Value Pair Of Data
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      // Make an AJAX POST request
      $.ajax({
        url: '/user/register',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function handleFormSubmission(response) {
          if (response.token) {
            // Store the token in localStorage
            localStorage.setItem('userToken', response.token);
            console.log(response);
            console.log(response.token);
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
                background: "green",
              }).showToast();
              setTimeout(function() {
                window.location.href = "/user/verifyotp";
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
          },
        });
    });
});