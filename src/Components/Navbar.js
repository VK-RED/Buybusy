import { Outlet,NavLink } from "react-router-dom";
import { useDetails } from "../Context_Files/CustomUserProvider";
import styles from "../Styles/Navbar.module.css"
import {auth,signOut} from '../firebase';

function Navbar(){

    const {loggedIn,userId} = useDetails();

    function handleSignOut(){

        signOut(auth);
    }
    

    return(
        <> 
            <div className={styles.container}>

                <NavLink to ="">
                    <div className={styles.header}>
                        <h2> BUYBUSY </h2>
                    </div>
                </NavLink>

                

                <div className={styles.iconsContainer}>

                    <NavLink to = "">
                        <div className={styles.iconContainer}>
                            
                            <img className = {styles.homeImg}src = "https://cdn-icons-png.flaticon.com/512/25/25694.png" />
                            <h3 className={styles.iconTitle} >Home</h3>  
                            
                        </div>
                    </NavLink>
                    
                    

                    {
                        loggedIn && (<NavLink to = "/orders">

                                        <div className={styles.iconContainer}>
                                            <img className={styles.orderImg} src = "https://cdn-icons-png.flaticon.com/512/3496/3496155.png" />
                                            <h3 className={styles.iconTitle} >Orders</h3>
                                        </div>

                                    </NavLink>)
                    }

                    {
                        loggedIn && (<NavLink to = '/cart'>

                                        <div className={styles.iconContainer}>
                                            <img src = "https://cdn-icons-png.flaticon.com/512/263/263142.png"/>
                                            <h3 className={styles.iconTitle} >Cart</h3>
                                        </div>


                                    </NavLink>)
                    }


                    {
                        loggedIn ? (<NavLink to = '/'>

                                        <div  className={styles.iconContainer} 
                                            onClick = {handleSignOut}>

                                            <img src = "https://static.vecteezy.com/system/resources/previews/000/574/965/original/vector-login-sign-icon.jpg"/>
                                            <h3 className={styles.iconTitle} >LogOut</h3>

                                        </div>
                            
                                    </NavLink>)
                        
                        : ( <NavLink to = 'signin'>

                                <div className={styles.iconContainer}>
                                    <img src = "https://static.vecteezy.com/system/resources/previews/000/574/965/original/vector-login-sign-icon.jpg"/>
                                    <h3 className={styles.iconTitle} >Login</h3>
                                </div>

                            </NavLink>)
                        
                    }

                    
                        

                    

                    


                </div>
                
                
            </div>
           
            <Outlet />
        </>
    )

}

export default Navbar;