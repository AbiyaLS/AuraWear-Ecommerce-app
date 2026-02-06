import React from "react";
import { NavLink } from "react-router-dom";
import { CirclePlus, CalendarCheck2, Package } from "lucide-react";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 border-r-4 
     ${isActive ? "bg-pink-100 border-pink-600 text-pink-700" : "border-transparent hover:bg-gray-100"}`;

  return (
    <>
      {/* 🔹 Desktop Sidebar */}
      <div className="hidden md:flex w-[220px] min-h-screen border-r bg-white">
        <div className="flex flex-col gap-2 text-sm pt-10 w-full">
          <NavLink to="/add" className={linkClass}>
            <CirclePlus size={20} />
            <span>Add Items</span>
          </NavLink>

          <NavLink to="/list" className={linkClass}>
            <CalendarCheck2 size={20} />
            <span>List Items</span>
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <Package size={20} />
            <span>Orders</span>
          </NavLink>
        </div>
      </div>

      {/* 🔹 Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-50">
        <NavLink to="/add" className="flex flex-col items-center text-xs">
          <CirclePlus size={20} />
          <span>Add</span>
        </NavLink>

        <NavLink to="/list" className="flex flex-col items-center text-xs">
          <CalendarCheck2 size={20} />
          <span>List</span>
        </NavLink>

        <NavLink to="/orders" className="flex flex-col items-center text-xs">
          <Package size={20} />
          <span>Orders</span>
        </NavLink>
      </div>
    </>
  );
}
