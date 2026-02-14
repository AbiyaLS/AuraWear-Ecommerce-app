import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl,currency } from "../App";
import { toast } from "react-toastify";
import parcel from "../assets/parcel.png";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  // Fetch all order to admin
  const fetchAllOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backendUrl}api/order/list`,
        {},
        { headers: { token } },
      );
      console.log(response.data);
      if (response.status === 200) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", error.message);
    }
  };

  // Update Status 
  const statusHandler = async ( e, orderId ) => {
    try {
      const response = await axios.post(`${backendUrl}api/order/status`, { orderId, status:e.target.value }, { headers: { token }})
      if(response.status === 200){
        await fetchAllOrders()
      }
    } catch (error) {
       console.log(error);
      toast.error(response.data.message);
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h1>Orders Page</h1>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 items-start border-2 border-gray-200 p-5 md:p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img src={parcel} className="w-8" alt="parcel icon" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-4 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +  
                    order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[16px]">{currency}{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} className="py-1 px-4 text-sm font-medium" value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>

            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
 