/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import { useState} from 'react';
import {onAuthStateChanged,signInWithPopup,GoogleAuthProvider, signOut} from 'firebase/auth'
import { auth } from './firebaseConf';

import "./App.css"
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
    }).catch(() => {
    })};
  


  const logout = async () => {
    await signOut(auth)
  }  

  return (

    <div className='App'>
        <div className='TopBar'>
            <h1>Chat App</h1>
            { user? (<>
                <p> Hello, {user.displayName} </p>
                <button 
                  className='SignoutButton' 
                  onClick={logout}>Signout</button></>
                )
            :( <button 
                  className='SignUpBtn'
                  name="google" 
                  onClick={signInWithGoogle}>Google </button>
                  )   
            }
          </div>
          <div className='MainBox'>
              <div className='Chats'> 
                {user ?( <> <Chat /> <SendMessage /> </>) : null}
              </div>

              {/* <div className='messageBox'>
                {user ? ( <form className='message'> 
                    <input type="text"></input></form>): null}
                    <input type="submit" value='->'></input>
              </div> */}
                
          
          </div>
    </div>
  );
}

export default App;
