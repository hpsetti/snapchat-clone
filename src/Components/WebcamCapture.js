import {useRef,useState, useCallback} from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { setCameraImage } from '../features/cameraSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./WebcamCapture.css"

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
  };

const WebcamCapture = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate("/preview",{replace:false})
        
    },[webcamRef])

    return(
        <div className="webcamCapture">
            <Webcam
                audio={false}
                height={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon className="webcamCapture__button" fontSize="large" onClick={capture}/>
        </div>
    )

}

export default WebcamCapture