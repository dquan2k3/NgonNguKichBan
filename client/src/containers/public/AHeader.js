import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faCubes, faChartLine, faAddressBook, faCartFlatbed, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AHeader = () => {
  const navigate = useNavigate();
  const [hoverEnabled, setHoverEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoverEnabled(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className=''>
      <header className="flex fixed items-center h-20 px-6 sm:px-10 bg-white left-20 w-full">
        <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
          <span className="sr-only">Menu</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 4v16" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20h12" />
          </svg>

        </button>
        <div className="relative w-full max-w-md sm:-ml-2 font-bold text-2xl">
          TRANG ADMIN
        </div>
        <div className="flex flex-shrink-0 items-center ml-auto mr-10">
          <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
            <span className="sr-only">User Menu</span>
            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
              <span className="font-semibold">Admin</span>
              <span className="text-sm text-gray-600"></span>
            </div>
            <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img src="https://th.bing.com/th/id/OIP.EButPh5XVfk5CuenIfhuagHaHa?rs=1&pid=ImgDetMain" alt="user profile photo" className="h-full w-full object-cover" />
            </span>
          </button>

        </div>
      </header>
      <aside className={`hidden fixed sm:flex sm:flex-col h-screen z-[51] w-20 transition-all duration-300 ${hoverEnabled ? 'hover:w-96' : ''}`}>
        <a onClick={() => navigate('/dashboard')} href="#" className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500">
          <img className='w-[80%] h-[80%]' src='https://res.cloudinary.com/dwlsi7aau/image/upload/v1734629664/ur5tli7sfiwa3r6d2x0t.jpg' />
        </a>

        <div className='flex-grow flex flex-col justify-between text-gray-500 bg-gray-800'>
          <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
            <nav className="flex flex-col mx-4 my-6 space-y-4 z-[51]">
              <a onClick={() => navigate('/dashboard')} id='dashboard' href="#" className="w-full overflow-hidden flex items-center justify-start py-3 pl-[15px] hover:text-gray-300 hover:bg-gray-700 focus:text-gray-300 focus:bg-gray-700 rounded-lg">
                <FontAwesomeIcon icon={faChartLine} />
                <div className="whitespace-nowrap ml-5 text-xl">Dashboard</div>
              </a>
              <a onClick={() => navigate('/product')} id="product" href="#" className="w-full overflow-hidden flex items-center justify-start py-3 pl-[15px] hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <FontAwesomeIcon icon={faCube} />
                <div className="whitespace-nowrap ml-5 text-xl">Sản phẩm</div>
              </a>
              {/* <a href="#" className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg">
              <FontAwesomeIcon icon={faCube} />
            </a> */}
              <a onClick={() => navigate('/productType')} id="productType" href="#" className="w-full overflow-hidden flex items-center justify-start py-3 pl-[10px] hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <FontAwesomeIcon icon={faCubes} className="text-2xl" />
                <div className="whitespace-nowrap ml-5 text-xl">Loại sản phẩm</div>
              </a>
              <a onClick={() => navigate('/order')} id="order" href="#" className="w-full overflow-hidden flex items-center justify-start py-3 pl-[10px] hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <FontAwesomeIcon icon={faCartFlatbed} className="text-2xl" />
                <div className="whitespace-nowrap ml-5 text-xl">Đơn hàng</div>
              </a>
              <a onClick={() => navigate('/contacta')} href='#' id='contact' className="w-full overflow-hidden flex items-center justify-start py-3 pl-[15px] hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <FontAwesomeIcon icon={faAddressBook} />
                <div className="whitespace-nowrap ml-5 text-xl">Liên hệ từ khách hàng</div>
              </a>
              <a onClick={() => navigate('/voucher')} href='#' id='voucher' className="w-full overflow-hidden flex items-center justify-start py-3 pl-[15px] hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <FontAwesomeIcon icon={faTicket} />
                <div className="whitespace-nowrap ml-5 text-xl">Quản lý mã giảm gía</div>
              </a>
            </nav>
            <div className="inline-flex items-center justify-center h-20 w-full border-t border-gray-700 p-3">
              <button onClick={() => navigate('/setting')} id='setting' className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg w-full justify-center flex">
                <span className="sr-only">Settings</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>


          <div className='bg-red-500 w-0 h-full left-20 absolute z-[51] '>

          </div>
        </div>

      </aside>
    </div>

  );
};

export default AHeader;
