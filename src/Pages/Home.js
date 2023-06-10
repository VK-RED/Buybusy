import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {db} from "../firebase";
import { onSnapshot, collection} from "firebase/firestore";
import ProductItem from "../Components/ProductItem";
import {userSelector } from "../redux/reducers/userReducer";


function Home(){

    const [products, setProducts] = useState();
    const userId = useSelector(userSelector);
    const [search,setSearch] = useState("");
    const [searchArr,setSearchArr] = useState([]);

    useEffect(()=>{

        const getProducts = ()=>{

            onSnapshot(collection(db, "appData"),(snapShot)=>{
                const arr = snapShot.docs.map((doc)=>doc.data());
                setProducts(arr[0].products);
                
            })
        }
        getProducts();
        
      
    },[userId])

    
    useEffect(()=>{
        if(products){
            const arr = products.filter((product)=>product.title.toLowerCase().includes(search));
            setSearchArr(arr);
            
        }


    },[products,search])



    return(
        <div>
            
            <div className="w-80 m-auto" >
                <input className="border border-gray-200 h-12 w-72 rounded-full px-5 py-2 text-lg my-3"
                    onChange={(e)=>setSearch(e.target.value.toLowerCase())} 
                    type = "search"  value={search}
                    placeholder="Search for the items ..."               
                />
            </div>
            
            <div className="px-4">

                    {
                        search 
                        ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">
                            
                            
                            {
                                searchArr.map(
                                        (product)=><ProductItem key={product.id} product={product} />
                                )
                            }

                        </div>
                        : <div>

                                {
                                    products &&
                                    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">

                                        {
                                            products.map(
                                                (product)=><ProductItem key={product.id} product={product} />
                                            )
                                        }

                                    </div>
                                    
                                }




                        </div>
                    }  
                    
            </div>

            
        </div>
    )
}

export default Home;