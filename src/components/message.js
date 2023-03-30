/* eslint-disable no-unused-vars */
import React from "react";
import { auth } from "../firebaseConf";

const Message = ({message}) => {
    // passed the messages recieved from db in Chat.js
    // give each Message as a div with class Message for css
    // include the two database fields "name, message"
    return(
        <div className={"Message "+message.id}>
            <p> {message.name}</p>
            <p>{message.message}</p>
        </div>   
    )
}
// export the funct to be used in the chat.js
export default Message;