import {useRef,useEffect} from 'react';
import {auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "../firebase";
import {Link,useNavigate} from 'react-router-dom';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../firebase';


import styles from '../Styles/Signup.module.css'


function Signup(){

    const emailRef = useRef(null);
    const passRef = useRef(null);
    const nameRef = useRef(null);
    const navigate = useNavigate();


    

    useEffect(()=>{
        nameRef.current.focus();
    },[])

    //THIS WILL CREATE A NEW USER WITH MAIL AND PASSWORD 
    // ALSO THE CART AND ORDERS [] WILL BE CREATED IN THE D.B

    function handleSignup(){

        const email = emailRef.current.value;
        const password = passRef.current.value;

        emailRef.current.value = "";
        passRef.current.value = "";
        nameRef.current.value = "";

        nameRef.current.focus();

        createUserWithEmailAndPassword(auth,email,password)

        .then((cred) => {

            async function addCart(){
                await setDoc(doc(db,"cartData",cred.user.uid),{
                    cart:[],
                })
            }

            async function addOrder(){
                await setDoc(doc(db,"orderData",cred.user.uid),{
                    order : [],
                })
            }

            addCart();
            addOrder();

            navigate("/");           
        })
        .catch((error) => {
            window.alert(error.message);
        })

        



    }
    
    return(
        <>
            <div className = {styles.container}>
                <form className={styles.signupForm} onSubmit={(e)=> e.preventDefault()}>

                    <h2>Sign Up</h2>
                    
                    <input ref={nameRef} placeholder='Enter name' />
                    <input ref={emailRef} type = "email" placeholder='Enter Email' required/>
                    <input ref={passRef} type = "password" placeholder='Enter Password' required />

                    <Link to  = "/">
                        <button className={styles.signupButton}
                                onClick = {handleSignup}
                        >
                            Sign Up
                        </button>

                    </Link>


                </form>
            </div>
            

        </>
    )
}



export default Signup