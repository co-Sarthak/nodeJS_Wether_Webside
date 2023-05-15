//Client Side js

console.log("Client Side JavaScript Loaded")

//JavaScript 
const wetherForm = document.querySelector('form')
const search = document.querySelector('input')
const mess1 = document.querySelector('#mes-1')
const mess2 = document.querySelector('#mes-2')

//Here in Argument (e) stands for event
wetherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    mess1.textContent="Loading..."
    mess2.textContent=""
    const location = search.value
    fetch("http://localhost:8080/weather?address="+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            mess2.textContent=data.error
            console.log(data.error)
        }else{
            mess2.textContent=JSON.stringify(data)
            console.log(data)
        }
    })
})
    // console.log(location)
})