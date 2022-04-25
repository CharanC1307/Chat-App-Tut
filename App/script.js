const socket = io()
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt('Enter your name.')
appendMessage(`You joined <strong>${username}</strong>`)
socket.emit('new-user', username)

socket.on('chat-message', data => {
    appendMessage(`<strong>${data.username}:</strong> ${data.message}`)
})

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
})

socket.on('user-connected', data => {
    appendMessage(`<strong>${data}</strong> has joined the chat`)
})

socket.on('user-disconnected', data => {
    appendMessage(`<strong>${data}</strong> has disconnected`)
})

messageForm.addEventListener('submit', e => {
    //This is to prevent the page from refreshing and sending the form data to the server
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`<strong>You:</strong> ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}