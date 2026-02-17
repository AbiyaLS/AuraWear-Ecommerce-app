import React, { useState } from "react";
import upload from "../assets/upload.png";
import axios from "axios";
import { toast } from "react-toastify";

// Make sure backendUrl is your deployed backend in production
// Example:
// export const backendUrl = import.meta.env.VITE_API_URL;

import { backendUrl } from "../App";

export default function Add({ token }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    if (!image1 && !image2 && !image3 && !image4) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message || "Product added successfully");

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data?.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Network error while adding product");
    }
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start justify-start text-sm gap-3 mb-10"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2 font-medium">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className="cursor-pointer">
              <img
                src={!img ? upload : URL.createObjectURL(img)}
                className="w-20 h-20 object-cover border rounded"
                alt="upload"
              />
              <input
                type="file"
                id={`image${idx + 1}`}
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (idx === 0) setImage1(file);
                  if (idx === 1) setImage2(file);
                  if (idx === 2) setImage3(file);
                  if (idx === 3) setImage4(file);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <p className="mb-1">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Type here..."
          className="w-full max-w-[500px] border border-gray-400 py-2 px-4 rounded-md"
          required
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-1">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description..."
          className="w-full max-w-[500px] border border-gray-400 py-2 px-4 rounded-md"
          required
        />
      </div>

      {/* Category / Subcategory / Price */}
      <div className="flex flex-col sm:flex-row w-full sm:gap-8 gap-5">
        <div>
          <p className="mb-1">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full max-w-[250px] border border-gray-400 py-2 px-2 rounded-md"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-1">Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full max-w-[250px] border border-gray-400 py-2 px-2 rounded-md"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Dresses">Dresses</option>
            <option value="Sets">Sets</option>
          </select>
        </div>

        <div>
          <p className="mb-1">Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="₹324"
            className="w-full max-w-[200px] border border-gray-400 py-2 px-4 rounded-md"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <span
              key={size}
              onClick={() => toggleSize(size)}
              className={`cursor-pointer border px-3 py-1 rounded-md text-sm font-semibold ${
                sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
              } hover:border-[#C586A5]`}
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 items-center mt-2">
        <input
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-black text-white py-2 px-6 rounded-md mt-3 hover:opacity-90"
      >
        Add Product
      </button>
    </form>
  );
}
