import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import parcel from "../assets/parcel.png";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  // Fetch all orders (Admin)
  const fetchAllOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  // Update order status
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}api/order/status`,
        { orderId, status: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  // Delete delivered order
  const deleteOrderHandler = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await axios.post(
        `${backendUrl}api/order/delete`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Order deleted");
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Orders Page</h1>

      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 items-start border-2 border-gray-200 p-5 my-3 text-xs sm:text-sm text-gray-700"
          >
            <img src={parcel} className="w-8" alt="parcel icon" />

            {/* Items & Address */}
            <div>
              {order.items.map((item, index) => (
                <p key={index} className="py-0.5">
                  {item.name} x {item.quantity} <span>{item.size}</span>
                </p>
              ))}

              <p className="mt-4 mb-2 font-semibold text-md">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div>
              <p>Items: {order.items.length}</p>
              <p className="mt-2">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="text-sm sm:text-[16px] font-semibold">
              {currency}
              {order.amount}
            </p>

            {/* Status + Delete */}
            <div className="flex flex-col gap-2">
              <select
                onChange={(e) => statusHandler(e, order._id)}
                className="py-1 px-3 text-sm font-medium border rounded"
                value={order.status}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              {order.status === "Delivered" && (
                <button
                  onClick={() => deleteOrderHandler(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
