import React, { useState, useRef, useEffect } from "react";

import {auth, db} from '../firebaseConf';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import "./SendMessage.css"


const SendMessage = () => { 

    const [userTextBox,setUserTextBox]= useState([]);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null);


    const sendmessage= async (e) => {
        e.preventDefault()
        
        const message = userTextBox.map((item) => item.type === 'emoji' ? item.value.native : item.value).join('');

        if(message.trim() === ''){
            alert('Enter valid message')
        }else{
            //convert the selected messages to a combined string 
            const {uid, displayName} = auth.currentUser;
            await addDoc(collection(db,'messages'),{
                message: message,
                name: displayName,
                uid,
                sentAt: serverTimestamp()
            })
            setUserTextBox([])
        }
    };
    
    // this checks if there is click outside the emoji picker area and closes the emoji picker if there is
    useEffect(() => {
        function handleClickOutside(event) {
          if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setShowEmojiPicker(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [pickerRef]); 

    return(
        <>
            <button className="emojiButton panel-item" type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <svg className="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
            </button>
            {showEmojiPicker && (
                    <div className="emojiPicker" ref={pickerRef}>
                        <Picker onEmojiSelect={(emoji) => setUserTextBox([...userTextBox, { type: 'emoji', value: emoji }])} />
                    </div>
            )}

            <input
                className="panel-item"
                type="text"
                value={userTextBox.map((item) => item.type === 'emoji' ? item.value.native : item.value).join('')}
                onChange={(event) => setUserTextBox([{ type: 'text', value: event.target.value }])}
                placeholder="Message"         
                />
            
            <button className="panel-item sendButton" onClick={sendmessage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-reactid="1036">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                </button>
        
        </>
    )

}

export default SendMessage;