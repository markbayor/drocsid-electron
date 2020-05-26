import io from 'socket.io-client'
const socket = io('http://drocsid-web.herokuapp.com/')

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
