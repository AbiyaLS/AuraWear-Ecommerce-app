import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Verify() {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}api/order/verifyStripe`,
        { success, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (success === "true") {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment verification failed");
      navigate("/cart");
    }
  };
  useEffect(() => {
    if (token && success && orderId) {
      verifyPayment();
    }
  }, [token, success, orderId]);
  return <div></div>;
}
