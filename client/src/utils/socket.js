import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

const toast = msg =>  window.Materialize.toast(msg, 4000) 

function subscribeToServerSockets (cb) {
  socket.on('articleSaved', msg => toast(msg.msg))
  socket.on('fetchingArticles', msg => toast(msg.msg))
  socket.on('gotArticles', msg => toast(msg.msg))
  // socket.emit('subscribeToTimer', 1000) // this must be how to send data back to the server
}
export default { subscribeToServerSockets }
