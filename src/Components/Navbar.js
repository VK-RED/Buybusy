import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from "../firebase"
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/userReducer";

function Navbar(){

    const userId = useSelector(userSelector);

    function handleSignOut(){
        signOut(auth);
    }

    return(
        <>

           <div className="border-b border-gray-300 p-4 flex justify-between items-center shadow-xl z-50 sticky top-0 bg-gray-200">

                <div className = "text-5xl font-bold ">
                    <Link to="/">
                        <h1>BUYBUSY</h1>
                    </Link>
                </div>

                
                <div className="text-lg  justify-between hidden sm:block font-semibold">

                    <Link to = "/">
                        <span className="mx-5">Home</span>
                    </Link>

                    {
                        userId ? (<span>

                            <Link to = "/cart">
                                <span className="mx-5">Cart</span>
                            </Link>

                            <Link to = "/order">
                                <span className="mx-5">Orders</span>
                            </Link>

                            <Link to = "/">
                                <span onClick={handleSignOut} className="mx-5">Logout</span>
                            </Link>

                        </span>)
                        :(<span>
                            <Link to = "/signin">
                                <span className="mx-5">Signin</span> 
                            </Link>
                        </span>)
                    }
                </div>

            </div> 

            {/* FOR THE MOBILE RESPONSIVENESS, CREATING A NAV MENUS BELOW THE NAV */}

                <div id="menu" className="text-xl font-bold text-center bg-white py-3 sm:hidden transition ease-out duration-300">

                    <div>
                        <Link to = "/">
                            <span className="mx-5">Home</span>
                        </Link>
                    </div>

                    
                    {userId && <div>

                            <Link to = "/cart">
                                <span className="mx-5">Cart</span>
                            </Link>                        
                            </div>
                            
                    }

                    {userId && <div>

                            <Link to = "/order">
                                <span className="mx-5">Orders</span>
                            </Link>                        
                            </div>
                            
                    }

                    {userId && <div>

                            <Link to = "/">
                                <span onClick={handleSignOut} className="mx-5">Logout</span>
                            </Link>  
                                                
                        </div>

                    }

                    {
                        !userId && <div>

                            <Link to = "/signin">
                                <span className="mx-5">Signin</span> 
                            </Link>

                        </div>
                    }

                </div>

            <Outlet/>
        </>
        
    )
}

export default Navbar;
