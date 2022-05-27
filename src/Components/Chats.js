import {useState,useEffect} from 'react'
import "./Chats.css"
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { collection, getDocs,query, orderBy, onSnapshot } from "firebase/firestore";
import {db,auth} from "../firebase"
import Chat from "./Chat"
import {selectUser} from "../features/appSlice";
import {resetCameraImage} from "../features/cameraSlice"
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"



const Chats = () => {

    const [posts,setPosts] = useState([]);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await query(collection(db, "posts"), orderBy("timestamp", "desc"));
           
            onSnapshot(querySnapshot,(snapshot) => {
               setPosts(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        data:doc.data()
                    }
                }))
            })
            
        }
        getData()
    },[])

    const takeSnap = () => {
        dispatch(resetCameraImage())
        navigate("/");
    }



    return(
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats__avatar"/>
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon"/>
                    <input type="text" placeholder="Friends"/>
                </div>
                <ChatBubbleIcon className="chats__chatIcon"/>
            </div>

            <div className="chats__posts">
                {posts.map(({id,data: {image,timestamp,read,username,profilePic}}) => {
                    return <Chat key={id} profilePic={profilePic} id={id} image={image} timestamp={timestamp} read={read} username={username}/>
                })}
            </div>

            <RadioButtonUncheckedIcon
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    )
}

export default Chats;