import React from 'react'
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';


export const Footer = () => {
    return (
        <footer className="flex flex-col items-center pt-24">
            <div className="flex justify-center ml-5">
                <div className="w-96 flex flex-col">
                    <img className="mx-auto w-96 h-24 object-cover" src={logo} />
                    <span className="text-gray-400 text-lg h-9">Dive into the blossoming experience<br /> with our exquisite products</span>
                </div>
                <div className="w-96 flex flex-col mr-0">
                    <h4 className="font-bold">Contact</h4>
                    <div className="h-2"></div>
                    <span className="text-gray-400 text-lg h-9">LUX store inc.</span>
                    <span className="text-gray-400 text-lg h-9">Quang Sơn - Lập Thạch - Vĩnh Phúc</span>
                    <span className="text-gray-400 text-lg h-9">0986-711-162</span>
                    <span className="text-black text-lg h-9">dquan2k3@gmail.com</span>
                </div>
                <div className="w-40 flex flex-col">
                    <h4 className="font-bold">Links</h4>
                    <div className="h-2"></div>
                    <a className="text-black text-lg h-7 hover:underline" href="#">Home</a>
                    <a className="text-black text-lg h-7 hover:underline" href="#">About us</a>
                    <a className="text-black text-lg h-7 hover:underline" href="#">Team</a>
                    <a className="text-black text-lg h-7 hover:underline" href="#">Blogs</a>
                    <a className="text-black text-lg h-7 hover:underline" href="#">Contact</a>
                </div>
                <div className="w-56">
                    <h4 className="font-bold">Follow us</h4>
                    <div className="flex flex-col space-y-0.5 mt-4">
                        <i className="pl-0">
                            <FontAwesomeIcon className="size-6 text-gray-400 hover:text-blue-500 cursor-pointer my-[0px] pl-0" icon={faFacebookF} />
                        </i>
                        <i className="pl-0">
                            <FontAwesomeIcon className="size-6 text-gray-400 hover:text-pink-600 cursor-pointer my-[0px] pl-0" icon={faInstagram} />
                        </i>
                        <i className="pl-0">
                            <FontAwesomeIcon className="size-6 text-gray-400 hover:text-blue-700 cursor-pointer my-[0px] pl-0" icon={faTwitter} />
                        </i>
                        <i className="pl-0">
                            <FontAwesomeIcon className="size-6 text-gray-400 hover:text-red-600 cursor-pointer my-[0px] pl-0" icon={faYoutube} />
                        </i>
                        <i className="pl-0">
                            <FontAwesomeIcon className="size-6 text-gray-400 hover:text-black cursor-pointer my-[0px] pl-0" icon={faTiktok} />
                        </i>
                    </div>

                </div>
            </div>
            <div className="mt-24 mb-64 flex w-[1000px]">
                <span className="text-gray-400 text-lg flex-1">© 2024 LUX Store</span>
                <div className="flex flex-1 justify-end">
                    <span className="text-gray-400 text-lg">We accept: </span>
                    <FontAwesomeIcon className="size-6 my-auto mx-1" icon={faCcVisa} className="text-xl ml-2" />
                    <FontAwesomeIcon className="size-6 my-auto mx-1" icon={faCcMastercard} className="text-xl ml-2" />
                </div>
            </div>
        </footer>
    )
}

export default Footer