import logo from "../assets/logo.png"
import banner_img from "../assets/banner-img.jpg"
import b11 from "../assets/b11.png"
import b12 from "../assets/b12.png"
import b13 from "../assets/b13.png"
import g11 from "../assets/g11.png"
import g12 from "../assets/g12.png"
import m11 from "../assets/m11.png"
import m12 from "../assets/m12.png"
import m13 from "../assets/m13.png"
import m21 from "../assets/m21.png"
import m22 from "../assets/m22.png"
import m23 from "../assets/m23.png"
import m24 from "../assets/m24.png"
import w11 from "../assets/w11.png"
import w12 from "../assets/w12.png"
import w13 from "../assets/w13.png"
import w14 from "../assets/w14.png"
import w21 from "../assets/w21.png"
import g21 from "../assets/g21.png"
import g22 from "../assets/g22.png"
import g23 from "../assets/g23.png"
import m31 from "../assets/m31.png"
import w41 from "../assets/w41.png"
import w31 from "../assets/w31.png"
import b21 from "../assets/b21.jpg"
import m41 from "../assets/m41.png"
import w51 from "../assets/w51.png"
import policy1 from "../assets/policy1.png"
import policy2 from "../assets/policy2.png"
import policy3 from "../assets/policy3.png"

export const assets = {
   logo,
   banner_img,
   policy1,policy2,policy3,
   b11,b12,b13,
   b21,
   g11,g12,
   g21,g22,g23,
   m11,m12,m13,
   m21,m22,m23,m24,
   m31,m41,
   w11,w12,w13,w14, 
   w21,w31,w41,w51
}

export const products = [
    {
        _id: "1",
        name: "Mens Shirt",
        description: "Multi colour Strip shirt",
        price: 1000,
        image: [m11,m12,m13],
        category: "Men",
        subCategory: "Topwear",
        size: ["s","m","l"],
        date: 12/12/2024,
        bestSeller: true
    },
    {
        _id: "2",
        name: "Dress",
        description: "Laced Dress",
        price: 899,
        image: [w11,w12,w13,w14],
        category: "Women",
        subCategory: "Dresses",
        size: ["s","m","l"],
        date: 12/12/2024,
        bestSeller: true
    },
    {
        _id: "3",
        name: "Short & Shirt set",
        description: "Beautiful set for boys",
        price: 1500,
        image: [b11,b12,b13],
        category: "Kids",
        subCategory: "Sets",
        size: ["s","m","l"],
        date: 12/12/2024,
        bestSeller: true
    },
    {
        _id: "4",
        name: "Tshirt",
        description: "Plain colour Tshirt with white collar",
        price: 500,
        image: [m21,m22,m23,m24],
        category: "Men",
        subCategory: "Topwear",
        size: ["s","m","l"],
        date: 12/12/2024,
        bestSeller: true
    },
    {
        _id: "5",
        name: "Sweater",
        description: "Beautiful light weight sweater",
        price: 700,
        image: [g11,g12],
        category: "Kids",
        subCategory: "Winterwear",
        size: ["s","m","l"],
        date: 12/12/2024,
        bestSeller: false
    },
    {
        _id: "6",
        name: "Dress",
        description: "Black with skin colour body cone dress",
        price: 999,
        image: [w21],
        category: "Women",
        subCategory: "Dresses",
        size: ["s","m","l","xl"],
        date: 12/12/2024,
        bestSeller: true
    },
    {
        _id: "7",
        name: "Kids Tshirts",
        description: "Breathable tshirts",
        price: 399,
        image: [b21],
        category: "Kids",
        subCategory: "Topwear",
        size: ["s","m","l"],
        date: 12/12/2024,
        bestSeller: false
    },
    {
        _id: "8",
        name: "Girl Kids Sets",
        description: "Plain Tshits with Lined Pants",
        price: 599,
        image: [g21,g22,g23],
        category: "Kids",
        subCategory: "Sets",
        size: ["s","m","l"],
        date: 12/12/2024,
        bestSeller: true
    },
    {
        _id: "9",
        name: "Mens Shirts",
        description: "Plain shirt",
        price: 799,
        image: [m31],
        category: "Men",
        subCategory: "Topwear",
        size: ["s","m","l","xl"],
        date: 12/12/2024,
        bestSeller: false
    },
    {
        _id: "10",
        name: "Dress",
        description: "Plain white dress",
        price: 799,
        image: [w31],
        category: "Women",
        subCategory: "Dresses",
        size: ["s","m","l","xl"],
        date: 12/12/2024,
        bestSeller: true
    },
    {
        _id: "11",
        name: "Women Sets",
        description: "Womens light shaded skirt and shirt set",
        price: 1049,
        image: [w51],
        category: "Women",
        subCategory: "Sets",
        size: ["s","m","l","xl"],
        date: 12/12/2024,
        bestSeller: false
    },
    {
        _id: "12",
        name: "Brown Pants",
        description: "vvvgf",
        price: 899,
        image: [m41],
        category: "Men",
        subCategory: "Bottomwear",
        size: ["s","m","l","xl"],
        date: 12/12/2024,
        bestSeller: true
    },


]