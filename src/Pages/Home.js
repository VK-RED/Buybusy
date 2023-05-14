import { useEffect,useState,useRef } from 'react';
import styles from '../Styles/Home.module.css';
import {db} from "../firebase";
import {addDoc,collection,doc,getDocs,onSnapshot,query,where} from "firebase/firestore";
import Item from '../Components/Item';


function Home(){

    const[products,setProducts] = useState([]);
    const searchRef = useRef(null);
    const[searchArr,setSearchArr] = useState([]);
    const[searchQuery, setSearchQuery] = useState("");

    const productRef = collection(db,"appData");
    

    useEffect(()=>{

        
        function getProducts(){

            onSnapshot(collection(db,"appdata"),(snapShot)=>{         
                                const data = snapShot.docs.map((doc)=>(doc.data()));
                                setProducts(data[0].products);        
                    })

        }

        getProducts();                    
    },[])

    async function handleSearch(){

        let qr = searchRef.current.value;
        setSearchQuery(qr.toLowerCase());
        const arr = products.filter((product)=>{
            if(product.title.toLowerCase().includes(searchQuery))
                return product;
        });
        setSearchArr(arr);

    }

    return(
        <div className = {styles.container}>
            <input className={styles.search}
                    onChange = {()=>handleSearch()}
                    ref = {searchRef} 
                type = "search" placeholder='Search By Product Name' 
                
            />

            <div className={styles.productsContainer}>

                {
                    !searchQuery ? (products.map((product)=>(<Item key = {product.id} product = {product}/>)))
                    : (

                        searchArr.map((product)=>(<Item key = {product.id} product = {product}/>))

                      )
                }

            

            </div>
        </div>
    )
}

export default Home;