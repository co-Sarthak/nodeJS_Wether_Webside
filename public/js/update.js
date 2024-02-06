console.log("Update.js")

$(document).ready(function (){
    $('#userupdate').submit(function (event) {
        event.preventDefault();

        //Get formData
        const formData = new FormData(this);
    
        var userToken = localStorage.getItem('userToken');
        console.log(userToken);
    $.ajax({
        url: '/user/update/me',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            'Authorization': userToken
        },
        success: function handleFormSubmission(res){
            if(res.message){
                Toastify({
                    text: res.message,
                    duration: 3000,
                    destination: '/',
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                }).showToast();
            }else{
                Toastify({
                    text: res.wrmessage,
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
    })
})
})