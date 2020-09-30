import * as firebase from "firebase/app";
import firebaseConfig from '../../firebase.config'
import "firebase/auth";

export const initializedLogInFramework = () =>{
        if(firebase.apps.length === 0){
            firebase.initializeApp(firebaseConfig);
        }
    }
    
export const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
            return firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const {displayName, email, photoURL} = result.user;
                const signInUser ={
                    isSignIn: true,
                    fullName: displayName,
                    email: email,
                    photoURL: photoURL,
                    success: true,
            };
            return signInUser;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            newUserInfo.isSignIn = false;
            alert(error.message)
            return newUserInfo;
        });
    }

export const handleFbSignIn = ()=> {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
     return  firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const signInUser ={
                isSignIn: true,
                fullName: displayName,
                email: email,
                photoURL: photoURL,
                success: true,
        };
        return signInUser;

        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            newUserInfo.isSignIn = false;
            return newUserInfo;
        });
    };
      
export const handleSignOut = () => {
        return firebase.auth().signOut()
        .then(res =>  {
            const signInUser ={
                isSignIn:false,
                success:false,
            };
            return signInUser;
        })
    }

export const createUserWithEmailAndPassword = (fullName, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.isSignIn = true;
        newUserInfo.success = true;
        newUserInfo.fullName = fullName;
        updateUser(fullName, res.photoURL);
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        newUserInfo.isSignIn = false;
        alert(error.message)
        return newUserInfo;
    });
    }

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.fullName = res.user.displayName;
                newUserInfo.password = '';
                newUserInfo.error = '';
                newUserInfo.success = true;
                newUserInfo.isSignIn = true;
                return newUserInfo;
                
            })
            .catch(error => {
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                newUserInfo.isSignIn = false;
                alert(error.message)
                return newUserInfo;
            });
    }

export const updateUser = (fullName, photoURL) => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
            displayName: fullName,
            photoURL: photoURL,
            }).then(res => {
            }).catch(error => alert(error.message));
    }