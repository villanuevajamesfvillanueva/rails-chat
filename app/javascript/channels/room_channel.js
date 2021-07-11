import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {

    const room_element = document.getElementById('room-id');
    const room_id = Number(room_element.getAttribute('data-room-id'));
    const send_button = document.getElementById('send-btn');
    const input_box = document.getElementById('message_content');

    // for terminating other subscriptions when connected to a new subscription
    console.log(consumer.subscriptions);
    consumer.subscriptions.subscriptions.forEach(subs => {
        consumer.subscriptions.remove(subs);
    });

    consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
        connected() {
          // Called when the subscription is ready for use on the server
          console.log("Connected to " + room_id);
        },
      
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
      
        received(data) {
          // Called when there's incoming data on the websocket for this channel
          const user_element = document.getElementById('user-id');
          const user_id = Number(user_element.getAttribute('data-user-id'));
         
          let html;
          user_id === data.message.user_id ? html = data.own_message : html = data.not_own_message;
      
          const messageContainer = document.getElementById('messages');
          messageContainer.innerHTML += html;
          send_button.disabled = false;
          input_box.value = '';
        }
      });
});

