import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import firebaseConfig from '../../firebase.config';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [goForLogin, setGoForLogin] = useState(false)
    const [matchPass,setMatchPass]=useState(true)
    let history=useHistory();
    let location=useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleUser = (event) => {
        console.log(loggedInUser.email, loggedInUser.password)
        if (!goForLogin && loggedInUser.email && loggedInUser.password) {
            console.log('submitting')
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((loggedInUserCredential) => {


                    updateUserName(loggedInUser.name);
                    history.replace(from);

                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    // ..
                });

        }
        if (goForLogin && loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((res) => {
                    // Signed in
                    const { displayName, email } = res.user;
                    let signInUser={...loggedInUser}
                     signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setLoggedInUser(signInUser)
                history.replace(from);

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
        event.preventDefault();
    }
    const updateUserName = name => {
        const loggedInUser = firebase.auth().currentUser;

        loggedInUser.updateProfile({
            displayName: name
        })
            .then(function () {
                // Update successful.
            })
            .catch(function (error) {
                // An error happened.
            });
    }
    const handleGoogleUser = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        console.log("sign in")
        firebase.auth()
            .signInWithPopup(provider)
            .then(res => {
                console.log("res find")
                console.log(res)
                const { displayName, email } = res.user;
                let signInUser={...loggedInUser}
                signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setLoggedInUser(signInUser)
                history.replace(from);

            })
    }
    let oldPassword;
    const handleChange = (event) => {

        let isFormValid = true;
        
        console.log(event.target.name, event.target.value)
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value)

        }
        if (event.target.name === 'password') {
            oldPassword=event.target.value;
            console.log(oldPassword)
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFormValid = isPasswordValid && passwordHasNumber
        }
        if (event.target.name === 'confirmPass') {
            console.log(oldPassword,event.target.value)
            if((oldPassword!==event.target.value))setMatchPass(false)
            else{
                setMatchPass(true)
                
            }
        }
        if (isFormValid) {
            setMatchPass(true)
            const newUserInfo = { ...loggedInUser }
            newUserInfo[event.target.name] = event.target.value;
            setLoggedInUser(newUserInfo)
        }
    }

    return (
        <div>
            <div className="form-container text-center">
                <div>
                    <div className="form text-center">
                        <form action="">

                            {!goForLogin && <input className="input-field" onChange={handleChange} name="name" type="text" placeholder="Name" required/>}
                            <input className="input-field" type="email" onChange={handleChange} name="email" placeholder="loggedInUserName or Email" required/>
                            <input className="input-field" type="password" onChange={handleChange} name="password" placeholder="Password"required />
                            {!goForLogin && <input className="input-field" onChange={handleChange} name="confirmPass" type="password" placeholder="Confirm Passsword" required />}
                            {!matchPass && <small style={{color:'red'}}>Password not match</small>}
                            {!goForLogin && <button className="orangeBtn" onClick={handleUser}>Create New Account</button> } 
                            {goForLogin && <button className="orangeBtn" onClick={handleUser}>LogIn</button>}
                            {!goForLogin &&
                                <p>Already has an account?<button className="stateChangebtn" onClick={() => { setGoForLogin(true) }}>Log in</button> </p>
                            }
                            {goForLogin && <p>Don't have a account?<button className="stateChangebtn" onClick={() => { setGoForLogin(false) }}>Create account</button></p>}

                        </form>
                    </div>
                    <div className="google">
                        <button onClick={handleGoogleUser}>Sign in with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;