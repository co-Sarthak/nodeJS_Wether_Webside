$(document).ready(function(){
//   $("button").click(function(){
//     $("p").hide();
//   });
// });
$("button").click(function(){
    $("#div1").load("demo_test.txt")
})
})
//     , function(responseTxt, statusTxt, xhr){
//     if(statusTxt == "success")
//       alert("External content loaded successfully!");
//     if(statusTxt == "error")
//       alert("Error: " + xhr.status + ": " + xhr.statusText);
// });
// });

// $("button").click(function(){
//     $("div").animate({
//       left: '250px',
//       height: '+=150px',
//       width: '+=150px'
//     });
// });