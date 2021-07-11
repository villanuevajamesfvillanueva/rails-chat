import consumer from "./consumer"

consumer.subscriptions.create({ channel: "RoomChannel", room_id: 3 }, {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected...");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const element = document.getElementById('user-id');
    const user_id = Number(element.getAttribute('data-user-id'));
   
    let html;
    user_id === data.message.user_id ? html = data.own_message : html = data.not_own_message;

    const messageContainer = document.getElementById('messages');
    messageContainer.innerHTML += html;
  }
});
