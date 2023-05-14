import styles from "../Styles/Item.module.css"
import{useEffect, useState} from "react";
import { useItems } from '../Context_Files/CustomItemProvider';
import { useDetails } from "../Context_Files/CustomUserProvider";
import { useNavigate } from "react-router-dom";

function Item(props){

    const {product} = props;
    const {addToCart} = useItems();
    const {loggedIn} = useDetails();
    const navigate = useNavigate();
    
    return(
        <div className={styles.container}>

            <div className={styles.imgContainer}>
                <img src = {product.image} />
            </div>

            <div className={styles.details}>
                <p>{`${product.title.substring(0,35)} ...`}</p>
                
            </div>

            <p className={styles.price}>{`₹ ${product.price}`}</p>

            <button className={styles.cartBtn}
                    onClick = {

                        loggedIn ? (()=>addToCart(product))
                        : (()=>{navigate("/signin")})
                        
                    }           
            >
                Add to Cart
            </button>
            
        </div>
    )
}

export default Item;