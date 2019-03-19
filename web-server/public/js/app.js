const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('.first__response')
const messageTwo = document.querySelector('.second__response')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const location = searchInput.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('http://localhost:4000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return messageOne.textContent = data.error
      }

      messageOne.textContent = data.forecast
      messageTwo.textContent = data.location
    })
  })
})
