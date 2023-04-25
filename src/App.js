/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import { useState} from 'react';
import {onAuthStateChanged,signInWithPopup,GoogleAuthProvider, signOut} from 'firebase/auth'
import { auth } from './firebaseConf';

import "./App.css"
import googlebtn from "./img/google.png"

import Chat from './components/Chat';
import SendMessage from './components/SendMessage';

function App() {
  const[user,setUser] = useState({});
  const provider = new GoogleAuthProvider();

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
  });
  
  const signInWithGoogle = async ()=>{
    signInWithPopup(auth,provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = provider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
    }).catch(() => {
    })};
  


  const logout = async () => {
    await signOut(auth)
  }  

  return (

    <div className='App'>
        
          <div className='MainBox'>
              <div className='TopBar'>
              <h1>Chat App</h1>
              { user ? (<>
                  <p> Hello, {user.displayName} </p>
                  <button className='SignoutButton' title='SignOut' onClick={logout}>
                  <svg className='signoutSVG' xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12L13 12"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button></>
                  )
              : <button 
              className='SignUpBtn' 
              id="google" 
              onClick={signInWithGoogle}><img src={googlebtn} alt="submit" /></button>  
              }
            </div>


            {user ? 
            (
              <><div className='Chats'><Chat /></div>
              <div className='messageBox'>
                <div className='messageBoxContainer'>
                  <SendMessage />
                </div>
              </div>
              </>
            ) : "ADD WELCOME TEXT HERE" }          
        
          </div>
    </div>
  );
}

export default App;
