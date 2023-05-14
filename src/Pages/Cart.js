import { useItems } from "../Context_Files/CustomItemProvider";
import styles from "../Styles/Cart.module.css";
import { useNavigate } from "react-router-dom";

function Cart({product}){

    const navigate = useNavigate();
    const{cart,price,addToCart,decQuantity,removeFromCart,handlePurchase} = useItems();

    function handlePurchaseBtn(){
        handlePurchase();
        navigate("/orders");
    }

    return(
        <div className={styles.cartContainer}>

            <div className = {styles.priceContainer}>

                <h3 className={styles.totalPrice}>
                    {`TotalPrice : ₹ ${price}`}
                </h3>

                <button className = {styles.purchaseBtn}
                        onClick = {handlePurchaseBtn}
                >
                    Purchase Now
                </button>

            </div>

            <div className = {styles.itemsContainer}>

                {
                    cart.map((prod) => (
                        <div key ={prod.id} className={styles.productContainer}>

                            <img src = {prod.image} />
                            <p className={styles.productTitle}>{prod.title}</p>
                            <p className={styles.productPrice}>{`₹ ${prod.price}`}</p>

                            <span className={styles.quantityContainer}>

                                
                                <img
                                    onClick={()=>addToCart(prod)}
                                    src = "https://cdn-icons-png.flaticon.com/512/107/107256.png"                                
                                />

                                {prod.quantity}

                                <img
                                    onClick={()=>decQuantity(prod)}
                                    src = "https://cdn-icons-png.flaticon.com/512/107/107663.png" 
                                 
                                 />
                                

                            </span>

                            <button className={styles.removeBtn}
                                    onClick = {()=>removeFromCart(prod)}
                            >
                                Remove Item
                            </button>


                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Cart;