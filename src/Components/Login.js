import "./Login.css"
import {useDispatch} from "react-redux"
import {provider} from "../firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {login} from "../features/appSlice"




const Login = () => {
    const dispatch = useDispatch();
    const auth = getAuth();

    const logIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
            // The signed-in user info.
            dispatch(
                login({
                    username:result.user.displayName,
                    profilePic:result.user.photoURL,
                    id:result.user.uid
                })
            )
        const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
            // The email of the user's account used.
        const email = error.customData.email;
            // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    return(
        <div className="login">
            <div className="login__container">
                <img src="./snapchat-logo.png" />
                <button className="login__button" onClick={logIn}>Login In</button>
            </div>
        </div>
    );
}

export default Login;