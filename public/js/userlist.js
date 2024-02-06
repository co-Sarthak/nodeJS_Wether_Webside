$(document).ready(function() {

  var userToken = localStorage.getItem('userToken');
  console.log(userToken);

  // $.ajax({
    // var table = 
    $('#userlist').DataTable({
        processing: true,
        serverSide: true,
        url: '/users',
        type: 'GET',
        processData: false,
        headers: {
          'Authorization': userToken
        },
        // ajax: '/users',
    columns: [
      // {data: 'DT_RowIndex', name: 'DT_RowIndex'},
      {data: 'name', name: 'name'},
      {data: 'email', name: 'email'},
      {data: 'birthdate', name: 'birthdate'},
      {data: 'gender', name: 'gender'},
      {data: 'phoneno', name: 'phoneno'},
      {data: 'countryname', name: 'countryname'},
    ],
  // })
    // success: function handleFormSubmission(response) {
    //   // For Error Handling
    //   if (response.status==false){
    //     Toastify({
    //       text: response.error,
    //       duration: 3000,
    //       destination: "/",
    //       newWindow: true,
    //       close: true,
    //       gravity: "top",
    //       position: "right",
    //       backgroundColor: "red",
    //     }).showToast();
    //   }
    //   if (response.status==true){
    //     // users is array so need to provide index of it
    //     $('#name').text(response.users[0].name);
    //     // console.log(response.users[0].name);
    //     $('#email').text(response.users[0].email);
    //     $('#birthdate').text(response.users[0].birthdate);
    //     $('#gender').text(response.users[0].gender);
    //     $('#phoneno').text(response.users[0].phoneno);
    //     $('#countryname').text(response.users[0].countryname);

    //     if (response.message) {
    //       // Display a success toast notification
    //       Toastify({
    //         text: response.message,
    //         duration: 3000,
    //         destination: "/",
    //         newWindow: true,
    //         close: true,
    //         gravity: "top",
    //         position: "right",
    //         backgroundColor: "green",
    //       }).showToast();
    //     } else {
    //       // Display a warning toast notification
    //       Toastify({
    //         text: response.wrmessage,
    //         duration: 3000,
    //         destination: "/",
    //         newWindow: true,
    //         close: true,
    //         gravity: "top",
    //         position: "right",
    //         backgroundColor: "orange",
    //       }).showToast();
    //     }
    //   }
    // }
  })
})
