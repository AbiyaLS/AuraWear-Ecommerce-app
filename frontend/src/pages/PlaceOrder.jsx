import React, { useContext, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [payMethod, setPayMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (payMethod) {
        // API calls for cod
        case "cod":
          const response = await axios.post(
            `${backendUrl}api/order/place`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (response.status === 200) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}api/order/stripe`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (responseStripe.status === 200) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong", error.message);
    }
  };

  const inputField = "border border-gray-400 py-1.5 px-3 w-full";
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ----------left side ------- */}
      <div className="flex flex-col gap-4">
        <div className="text-2xl ">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-5 mt-4">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className={inputField}
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className={inputField}
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className={inputField}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className={inputField}
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-5 ">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className={inputField}
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className={inputField}
            required
          />
        </div>
        <div className="flex gap-5 ">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
            className={inputField}
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className={inputField}
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className={inputField}
          type="number"
          placeholder="Phone"
          required
        />
      </div>
      {/* --------------------------Right Side----------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
          <div className="mt-6">
            <div className="text-xl mb-2">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setPayMethod("stripe")}
                className="flex items-center cursor-pointer border py-1.5 px-4 border-gray-500"
              >
                <p
                  className={`min-w-3.5 h-3.5 rounded-full border hover:border-green-400 ${payMethod === "stripe" ? "bg-green-400" : ""}`}
                >
                  {" "}
                </p>
                <img
                  className="h-10 mx-2"
                  src={assets.stripe}
                  alt="stripe icon"
                />
              </div>
              {/* <div
                onClick={() => setPayMethod("razorpay")}
                className="flex items-center cursor-pointer border py-1.5 px-4 border-gray-500">
                <p
                  className={`min-w-3.5 h-3.5 rounded-full border hover:border-green-400 ${payMethod === "razorpay" ? "bg-green-400" : ""}`}>
                  {" "}
                </p>
                <img
                  className="h-10 w-20 mx-2"
                  src={assets.razorpay}
                  alt="razorpay icon"
                />
              </div> */}
              <div
                onClick={() => setPayMethod("cod")}
                className="flex items-center cursor-pointer border py-1.5 px-4 border-gray-500"
              >
                <p
                  className={`min-w-3.5 h-3.5 rounded-full border hover:border-green-400 ${payMethod === "cod" ? "bg-green-400" : ""}`}
                >
                  {" "}
                </p>
                <p className="mx-2 text-gray-500">Cash on Delivery</p>
              </div>
            </div>
            <div className="w-full text-end my-5">
              <button type="submit" className="bg-black text-white px-12 py-2">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
