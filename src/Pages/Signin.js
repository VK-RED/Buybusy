
import { Link, useNavigate } from "react-router-dom";
import { useState,useRef, useEffect } from "react";
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


function Signin(){

    const[email, setEmail] = useState("");
    const[password,setPassword] = useState("");
    const emailRef = useRef(null);
    const navigate = useNavigate("/");

    function handleSignIn(){

        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                emailRef.current.focus();
                setEmail("");
                setPassword("");
                navigate("/");
            })
            .catch(err => {
                window.alert(err);
            })
        
        
    }

    useEffect(()=>{
        emailRef.current.focus();
    },[])

    return(
        <div className="h-screen w-full flex-col justify-center items-center text-center">

            <h4 className="w-20 mx-auto mt-12 mb-8 text-3xl font-semibold">SignIn</h4>
            
            <div className="flex-col items-center h-auto my-4 w-80 mx-auto">

                <input className="border block mx-auto h-8 w-56 py-2 px-4 my-4"
                    ref={emailRef} onChange={(e)=>setEmail(e.target.value)} 
                    type="email" placeholder="Enter email" value={email}/>

                <input className="border block mx-auto h-8 w-56 py-2 px-4 my-4"
                        onChange={(e)=>setPassword(e.target.value)} 
                        type="password" placeholder="Enter Password" value={password}/>

                <button className="block mx-auto cursor-pointer font-bold px-3 py-2 rounded-full border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition ease-out duration-300 mb-4"
                        onClick={handleSignIn} type="button"> Sign In </button>
            </div>

            

            <div className="text-xs">

                <p className="inline-block"> New User instead </p>

                <p className="inline-block ml-2 text-lg font-bold ">
                    <Link to = "/signup">
                        Signup
                    </Link>
                </p>

                
                
            </div>
        </div>
    )
}

export default Signin;