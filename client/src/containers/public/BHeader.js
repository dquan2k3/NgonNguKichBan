import { useState } from 'react';
import React from 'react';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';


export const BHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="z-20 w-full h-[100px] bg-yellow-50 sticky top-[-70px] transition-all hover:top-0">
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

      <div className="w-[1100px] mx-auto my-auto h-full flex justify-between items-center">
        <div className="justify-start items-center flex w-auto h-full">
          <img onClick={() => navigate('/home')} src={logo} alt="logo" className=" max-w-full max-h-full h-auto block tracking-wide my-auto mx-[10px] cursor-pointer"/>
          <div onClick={() => navigate('/home')} className="font-bold uppercase text-xl tracking-wide my-auto mx-[10px] cursor-pointer  text-black hover:text-gray-600">Trang chủ</div>
          <div onClick={() => navigate('/shop')} className="font-bold uppercase text-xl tracking-wide my-auto mx-[10px] cursor-pointer  text-black hover:text-gray-600">Cửa hàng</div>
          <div onClick={() => navigate('/aboutus')} className="font-bold uppercase text-xl tracking-wide my-auto mx-[10px] cursor-pointer  text-black hover:text-gray-600">Giới thiệu</div>
          <div onClick={() => navigate('/contact')} className="font-bold uppercase text-xl tracking-wide my-auto mx-[10px] cursor-pointer  text-black hover:text-gray-600">Liên hệ</div>
        </div>

        <div className="flex-1 mx-auto">
          <form className="w-[80%] mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default BHeader
