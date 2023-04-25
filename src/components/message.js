/* eslint-disable no-unused-vars */
import React from "react";
import { auth } from "../firebaseConf";

import "./message.css"

const Message = ({message}) => {

    const {uid,displayname} = auth.currentUser;
    // passed the messages recieved from db in Chat.js
    // give each Message as a div with class Message for css
    // include the two database fields "name, message"
    
    // const name = auth.currentUser.displayName;
    const initials = (auth.currentUser.displayName).split(" ").map(word => word[0].toUpperCase()).join("");
    // const initials = "TT"

    return(
        <div className = "Message">
            <div className={"inlineContainer" + (uid === message.uid ? " own"  : "" )}>
                <div data-initials={initials}></div> 
                <div className={uid === message.uid ? "ownBubble own" : "otherBubble other"}>
                    {message.message}
                </div>
            
            </div>

        </div> 

        
    )
}
// export the funct to be used in the chat.js
export default Message;
