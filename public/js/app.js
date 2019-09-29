
// fetch('weather?address=philadelphia').then((Response) => {
//     return Response.json()
// }).then((data) => {
//     console.log(data)
//     const body =  document.querySelector('body')
//     const weather = document.querySelector('.weather')
//     weather.innerHTML = data.forecast

// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()



    fetch(`/weather?address=${search.value}`).then((Response) => {

        Response.json().then((data) => {
            if (data.error) {
                return document.querySelector('.location').textContent = data.error
            }
            document.querySelector('.location').textContent = data.location
            document.querySelector('.forecast').textContent = data.forecast
        })
    })


})