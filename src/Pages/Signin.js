import {auth, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "../firebase";
import {useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import styles from '../Styles/Signin.module.css'

function Signin(){

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const navigate = useNavigate();

    useEffect(()=>{
        emailRef.current.focus();
    },[])

    function handleSignin(){

        const email = emailRef.current.value;
        const password = passRef.current.value;

        emailRef.current.value = "";
        passRef.current.value = "";

        signInWithEmailAndPassword(auth,email,password)
        .then((cred) => {navigate("/")})
        .catch((error) => {
            window.alert(error.message);
        });

    }

    return(
        <>
            <div className = {styles.container}>

                <form className={styles.signinForm}
                      onSubmit={(e)=> e.preventDefault()}>

                        <h2 className={styles.signinName}>Sign In</h2>
                    
                        <input ref={emailRef} type = "email" placeholder='Enter Email' required/>
                        <input ref={passRef} type = "password" placeholder='Enter Password' required />

                        <button className={styles.signinButton}
                                onClick = {handleSignin}
                        >
                            Sign In
                        </button>


                        <div className={styles.login}>
                
                            <p>
                                Don't Have an Account <Link to = "/signup"> SignUp </Link> Instead
                            </p>
                            
                        </div>


                </form>

            </div>

        </>
    )
}

export default Signin;