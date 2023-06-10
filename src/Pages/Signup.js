import { useEffect, useRef, useState } from "react";
import { doc,setDoc } from "firebase/firestore";
import {auth,db} from "../firebase";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup(){

    const nameRef = useRef(null);
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        nameRef.current.focus();
    },[])

    const handleSignUp = ()=>{
        
        //ONCE A NEW USER IS CREATED, A CART AND ORDER ARR WILL BE ALLOCATED
        createUserWithEmailAndPassword(auth, email, password)
            .then(cred => {
    
                    async function addUserCart(){
                        await setDoc(doc(db, "cartData", cred.user.uid), {
                            cart:[],
                        })
                    };
                    
                    async function addUserOrder(){
                        await setDoc(doc(db, "orderData", cred.user.uid),{
                            orders:[],
                        })
                    };
                    
                    
                    addUserCart();
                    addUserOrder();

                    setEmail("");
                    setPassword("");
                    nameRef.current.value="";
                    navigate("/");
            })
            .catch(err => {
                window.alert(err);
            })
    }

    return(
        <div className="h-screen w-full flex-col justify-center items-center text-center" >

            <h4 className="w-20 mx-auto mt-12 mb-8 text-3xl font-semibold">SignUp</h4>

            <div className="flex-col items-center h-auto my-4 w-80 mx-auto">

                <input className="border block mx-auto h-8 w-56 py-2 px-4 my-4"
                     ref={nameRef} type="text" placeholder="Enter Name" />

                <input className="border block mx-auto h-8 w-56 py-2 px-4 my-4"
                        onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" value={email}/>

                <input className="border block mx-auto h-8 w-56 py-2 px-4 my-4"
                        onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" value={password}/>

                <button className="block mx-auto cursor-pointer font-bold px-3 py-2 rounded-full border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition ease-out duration-300 mb-4"
                        onClick={handleSignUp}  type="button"> Sign Up </button>

            </div>

            
            
        </div>
    )
}

export default Signup;