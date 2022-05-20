import {useState,useEffect} from 'react'
import "./Chats.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { collection, getDocs,query, orderBy, onSnapshot } from "firebase/firestore";
import {db} from "../firebase"
import Chat from "./Chat"



const Chats = () => {

    const [posts,setPosts] = useState([]);

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



    return(
        <div className="chats">
            <div className="chats__header">
                <AccountCircleIcon className="chats__avatar"/>
                <div className="chats__search">
                    <SearchIcon/>
                    <input type="text" placeholder="Friends"/>
                </div>
                <ChatBubbleIcon className="chats__chatIcon"/>
            </div>

            <div className="chats__posts">
                {posts.map(({id,data: {image,timestamp,read,username,profilePic}}) => {
                    return <Chat key={id} profilePic={profilePic} id={id} image={image} timestamp={timestamp} read={read} username={username}/>
                })}
            </div>
        </div>
    )
}

export default Chats;