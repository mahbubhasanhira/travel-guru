import React, { isValidElement, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleGoogleSignIn, handleFbSignIn, handleSignOut, initializedLogInFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';
import fbIcon from '../../travel-guru-resource/Icon/fb.png';
import googleIcon from '../../travel-guru-resource/Icon/google.png';
import './Login.css';
const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn:false,
        firstName:'',
        lastName:'',
        fullName:'',
        email:'',
        password:'',
        loginPassword:'',
        photoURL:'',
        error:'',
        success: false,
    })
    
    initializedLogInFramework();
 

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
     const history = useHistory();
     const location = useLocation();
     let { from } = location.state || { from: { pathname: "/login" } };

 
    const googleSignIn = (e) => {
        e.preventDefault()
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const fbSignIn = (e) => {
        e.preventDefault()
        handleFbSignIn()
        .then(res => {
            handleResponse(res, true)
        })
    }

    const SignOut = () => {
        handleSignOut()
            .then(res =>{
                handleResponse(res, false)
        })
    }

    const handleBlur = (e) =>{

        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length >= 6;
            isFieldValid= isPasswordValid;
        }

        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
       
        
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        if(newUser && user.email && user.password){
            createUserWithEmailAndPassword((`${user.firstName} ${user.lastName}`), user.email, user.password)
            .then(res => {
                handleResponse(res, true)
            })
        };
        if(!newUser && user.email && user.password){
            signInWithEmailAndPassword(user.email, user.password)
            .then( res => {
                handleResponse(res, true);
            })
        }

    }

    const handleResponse = (res, redirect) =>{
        setUser(res);
        if(res.error){
            alert(res.error);
        }
        setLoggedInUser(res);
       if(redirect){
        history.replace(from);
       }
    }


    return (
        <div className='login_container container'>

                {   newUser ?
                    <div className='create_account_container'>
                        <h3>Create an account</h3>
                        <form onSubmit={handleSubmit}> 
                            <input type="text"  onBlur={handleBlur} name="firstName" placeholder='First Name' id="" required/>
                            <br/>
                            <input type="text"  onBlur={handleBlur} name="lastName" placeholder='Last Name' id="" />
                            <br/>
                            <input type="email"  onBlur={handleBlur} name="email" placeholder='Username or Email' id="" required/>
                            <br/>
                            <input type="password" onBlur={handleBlur}  name="password" placeholder='Password'  id="" required/>
                            <br/>
                            <input className="sign_up_btn" type="submit" value='Create an account'/>
                        </form> 
                        <p className='already_have_acc'>Already have an account? <span onClick={() => setNewUser(!newUser)}>Login</span></p>
                    </div>:

                    <div className='create_account_container'>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}> 
                        <input type="email" onBlur={handleBlur} name="email" placeholder='Username or Email' id="" required/>
                        <br/>
                        <input type="password" onBlur={handleBlur}  name="password" placeholder='Password'  id="" required/>
                        <br/> 
                        <input className="sign_up_btn" type="submit" value='Login'/>
                    </form> 
                    <p className='already_have_acc'>Don't have an account? <span onClick={() => setNewUser(!newUser)}>Create an account</span></p>
                    </div>
                }
           <div>
               <p className='or'>OR</p>
                <div onClick={fbSignIn} className='popupSignIn'>
                    <img src={fbIcon} alt="sign in with fb"/>
                    <button onClick={fbSignIn}>Continue with Facebook</button><br/>
                </div>
                <div onClick={googleSignIn} className='popupSignIn'>
                    <img src={googleIcon} alt="sign in with google"/>
                    <button onClick={googleSignIn}>Continue with Google</button>
                </div>
           </div>
        </div>
    );
};

export default Login;