import {useItems} from "../Context_Files/CustomItemProvider"
import styles from "../Styles/Orders.module.css"

function Orders(){

    const {orders} = useItems();
    
    function roundToTwoDecimalPlaces(number) {
        return Number(number.toFixed(2));
    }

    return(
        <div>
            
        
            <h3 className = {styles.header}>Your Orders</h3>


            <div className={styles.ordersContainer}>

                {
                    orders.map((order) => (

                        <div className={styles.tableWrapper}>

                            <h4 className = {styles.orderedTime}> Ordered On : {order.orderedOn}</h4>

                            <table border = "1"  className = {styles.tableContainer}>

                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>

                                {
                                    order.purchaseCart.map((item)=>(

                                        <tr>
                                            <td>{`${item.title.substring(0,35)} ...`}</td>
                                            <td>{`₹ ${item.price}`}</td>
                                            <td>{item.quantity}</td>
                                            <td>{`₹ ${roundToTwoDecimalPlaces(item.quantity * item.price)}`}</td>

                                        </tr>

                                    ))
                                }

                                <tr>
                                    <th>Net Price</th>
                                    <th>..</th>
                                    <th>..</th>
                                    <th>{`₹ ${order.overallPrice}`}</th>
                                </tr>



                            </table>

                        </div>

                        
                    ))
                }

            </div>
            
        </div>
    )
}

export default Orders;