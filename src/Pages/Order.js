import { useSelector } from "react-redux";
import { orderSelector } from "../redux/reducers/orderReducer";

function Order(){

    const orders = useSelector(orderSelector);
    

    return(
        <div className="p-2">
            
            <h2 className="text-4xl text-center font-bold mb-6"> Your Orders </h2>

            {
                orders.map((order,index)=>

                    <div className="border-8 rounded-xl m-4 text-center p-4" key={index}>

                        <h4 className="text-2xl font-semibold mb-4">Ordered On : {order.orderedOn}</h4>

                        <table className="mx-auto text-lg bg-white">

                            <thead>
                                <tr>
                                    <th className="border-2 px-2 border-gray-400">Title</th>
                                    <th className="border-2 px-2  border-gray-400">Price</th>
                                    <th className="border-2 px-2  border-gray-400">Quantity</th>
                                    <th className="border-2 px-2  border-gray-400">Net Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    order.cart.map((item,index)=>

                                        <tr key = {index}>
                                            <td className="border-2 px-2 border-gray-400">{item.title.substring(0,30)+" ..."}</td>
                                            <td className="border-2 px-2  border-gray-400">{"₹"+item.price}</td>
                                            <td className="border-2 px-2  border-gray-400">{item.quantity}</td>
                                            <td className="border-2 px-2  border-gray-400">{"₹"+item.price*item.quantity}</td>
                                        </tr>

                                    )
                                }

                                <tr>
                                    <td className="border-2 px-2  border-gray-400"></td>
                                    <td className="border-2 px-2  border-gray-400"></td>
                                    <td className="border-2 px-2  border-gray-400"></td>
                                    <th className="border-2 px-2  border-gray-400">Total - {"₹"+order.netPrice}</th>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    
                )
            }

        </div>
    )
}

export default Order;