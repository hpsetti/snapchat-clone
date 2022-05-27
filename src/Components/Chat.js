import "./Chat.css"
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import ReactTimeAgo from 'react-time-ago'
import {useDispatch} from 'react-redux'
import {imageSelect} from '../features/appSlice'
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../firebase"
import {useNavigate} from "react-router-dom"



const Chat = ({id, username, timestamp, image, read,profilePic}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openChat = async () => {
        if(!read) {
            dispatch(imageSelect(image));
            const readDocRef = doc(db, "posts", id);
            await updateDoc(readDocRef, {
                read: true
            });

            navigate("/chats/view");
        }
    }



    return(
        <div onClick={openChat} className="chat">
            <Avatar className="chat__avatar" src={profilePic}/>
            <div className="chat__info">
                <h4>{username}</h4>
                <p>{!read && "Tap to view -"}{" "} 
                {new Date(timestamp?.toDate()).toUTCString()}</p>
            </div>
            {!read && <StopRoundedIcon className="chat__readIcon"/>}
        </div>
    )
}

export default Chat;