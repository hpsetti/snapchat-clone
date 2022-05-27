import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {selectCameraImage,resetCameraImage} from '../features/cameraSlice'
import {selectUser} from "../features/appSlice";
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import { storage, db } from "../firebase"
import {ref, uploadString, getDownloadURL} from 'firebase/storage'
import { collection, setDoc, addDoc, serverTimestamp, doc, getFirestore } from "firebase/firestore"; 
// import firebase from 'firebase/app'

import "./Preview.css"

const Preview = () => {
    const imageCreated = useSelector(selectCameraImage)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    useEffect(()=> {
        if(!imageCreated) {
            navigate('/',{replace:true});
        }
    },[imageCreated,navigate])

    const closePreview = () => {
        dispatch(resetCameraImage());
    }

    const sendPicture = () => {
        const id = uuidv4();

        const postsRef = ref(storage,'posts/'+id);

        const firestore = getFirestore();

        


        const message4 = imageCreated;
        const uploadTask = uploadString(postsRef, message4,'data_url');

        const snapData = doc(firestore,`posts/${id}`)

        

        uploadTask.then((snapshot) => {
            console.log(snapshot)
        }).then(() => {
            getDownloadURL(postsRef)
            .then((url) => {
                function writeToDB() {
                const docData = {
                        image:url,
                        username:'HarishP',
                        profilePic:user.profilePic,
                        read:false,
                        timestamp:serverTimestamp()
                    }

                    setDoc(snapData,docData)
                }

                writeToDB()
                navigate("/chats",{replace:true})
            })
        })


        // function writeToDB() {
        //     const docData = {
        //       image:'downloadURL',
        //       username:'HarishP',
        //       read:false,
        //       timestamp:serverTimestamp()
        //     }

        //     setDoc(snapData,docData)
        // }

        // writeToDB()
    }

        return (
            <div className="preview">
                <CloseIcon className="preview__close" onClick={closePreview}/>
                <div className="preview__toolbox">
                    <TextFieldsIcon />
                    <CreateIcon />
                    <NoteIcon />
                    <MusicNoteIcon />
                    <AttachFileIcon />
                    <CropIcon />
                    <TimerIcon />
                </div>
                <img src={imageCreated} alt="preview__img" height='500px'/>
                <div className="preview__footer">
                    <h2>Send Now</h2>
                    <SendIcon fontSize="small" onClick={sendPicture} className="preview__sendIcon"/>
                </div>
            </div>
        )
}

export default Preview;