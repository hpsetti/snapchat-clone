import "./ChatView.css"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectImage} from "../features/appSlice" 
import {useEffect} from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const ChatView = () => {
    const selectedImage = useSelector(selectImage);
    const navigate = useNavigate();

    useEffect(() => {
        if(!selectedImage) {
            exit();
        }
    },[selectedImage])

    const exit = () => {
        navigate("/chats");
    }

    return(
        <div className="chatview">
            <img src={selectedImage} onClick={exit} alt="snapchat"/>
            <div className="chatview__timer">
            <CountdownCircleTimer
            isPlaying
            duration={10}
            strokeWidth={6}
            size={50}
            colors={[
                ["#004777",0.33],
                ["#F7B801",0.33],
                ["#A30000",0.33],
            ]}>
                {({remainingTime}) => {
                    if(remainingTime === 0) {
                        exit();
                    }
                    return remainingTime;
                }}
            </CountdownCircleTimer>
            </div>
        </div>
    );
}

export default ChatView;