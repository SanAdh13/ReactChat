import React, { useState } from "react";

import {auth, db} from '../firebaseConf';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => { 

    const [userTextBox,setUserTextBox]= useState([]);

    console.log(userTextBox);
    const sendmessage= async (e) => {
        e.preventDefault()
        

        if( userTextBox === ''){
            alert('Enter valid message')
        }
        const {uid, displayName} = auth.currentUser;
        await addDoc(collection(db,'messages'),{
            message: userTextBox,
            name: displayName,
            uid,
            sentAt: serverTimestamp()
        })
        setUserTextBox('')
    };

    return(

        <>
            <form onSubmit={sendmessage}>
                <input 
                    value={userTextBox}
                    type="text" 
                    onChange={(e)=>setUserTextBox(e.target.value)}
                    placeholder="Message" />

                <button type="submit">send</button>
            </form>

        
        </>
    )

}

export default SendMessage;