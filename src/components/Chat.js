/* eslint-disable no-unused-vars */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, {useState,useRef,userEffect, useEffect} from "react";
import { db } from "../firebaseConf";
import Message from "./message"
const Chat = () => {
    const [messages,setMessages] = useState([]);

    useEffect(()=>{
        const q = query(collection(db,'messages'),orderBy('sentAt'));
        const unsub = onSnapshot(q,(querySnapshot)=>{
            let messages = [];
            querySnapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.uid});
            })
            setMessages(messages)
        });
        return () => unsub();
    },[]);

    return(
        <>
            {messages && messages.map((message)=>(
                <Message message={message} />
            ))}
        </>
          
    );
};

export default Chat;