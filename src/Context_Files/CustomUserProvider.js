import {createContext,useContext,useState} from 'react';
import  {auth,getAuth,onAuthStateChanged} from '../firebase';



//CREATING THE CONTEXT
const aboutUser = createContext();

//CONSUMING THE CONTEXT
function useDetails(){
    const value = useContext(aboutUser);
    return value;
}

//PROVIDE THE CONTEXT
function CustomUserProvider({children}){

    const[loggedIn,setLoggedIn] = useState(false);
    const[userId,setUserId] = useState("");

    onAuthStateChanged(auth,(user)=>{
        if(user){
            setLoggedIn(true);
            setUserId(user.uid);
        }
        else{
            setLoggedIn(false);
            setUserId("");
        }
    });

    return(
        <aboutUser.Provider value = {{ 
                                        loggedIn,
                                        userId
         }}>
            {children}
        </aboutUser.Provider>
    )
}

export{useDetails}
export default CustomUserProvider;