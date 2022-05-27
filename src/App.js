import {useEffect,React} from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import WebcamCapture from './Components/WebcamCapture'
import Preview from './Components/Preview'
import Chats from './Components/Chats'
import ChatView from './Components/ChatView'
import Login from './Components/Login'
import {useSelector, useDispatch} from "react-redux"
import {selectUser, login, logout} from "./features/appSlice"
import { getAuth, onAuthStateChanged } from "firebase/auth";



function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const auth = getAuth();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        dispatch(login({
          username:user.displayName,
                    profilePic:user.photoURL,
                    id:user.uid
        }))
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(logout());
      }
    });
  },[])

  return (
    <div className="app">
  <BrowserRouter>
  {!user ? <Login/> : (
    <>
    <img src="./snapchat-logo.png" className="app__logo"/>
    <Routes>
      <Route path="/" exact element={<WebcamCapture/>}/>
      <Route path="/chats" exact element={<Chats/>}/>
      <Route path="/chats/view" exact element={<ChatView/>}/>
      <Route path="/preview" element={<Preview/>}/>
      </Routes>
      </>
  )}
      
      </BrowserRouter>
    </div>
  );
}

export default App;
