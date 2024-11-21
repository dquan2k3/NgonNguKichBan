import React from "react";
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';

function Contact() {
    return (
        <div>
            <Header />
            <BHeader />
            <div className="container mx-auto mt-12 ">
                {/* Bản đồ Google */}
                <div className="my-12">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5266.045458524531!2d105.7881114097759!3d21.04642785392715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb158a2305d%3A0x5c357d21c785ea3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkGnhu4duIEzhu7Fj!5e0!3m2!1svi!2s!4v1710431534668!5m2!1svi!2s"
                        width="100%"
                        height="400"
                        className="border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Form Liên Hệ */}
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Thông tin Liên Hệ */}
                    <div className="bg-gray-100 p-8 w-full md:w-[635px] space-y-8">
                        <div className="flex items-center border-b border-gray-300 pb-4">
                            <i className="fa-solid fa-location-dot text-2xl text-gray-700 mr-4"></i>
                            <div>
                                <h3 className="text-lg font-semibold">LUX store</h3>
                                <p>235 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội</p>
                            </div>
                        </div>
                        <div className="flex items-center border-b border-gray-300 pb-4">
                            <i className="fa-solid fa-mobile-screen-button text-2xl text-gray-700 mr-4"></i>
                            <div>
                                <h3 className="text-lg font-semibold">HOTLINE</h3>
                                <p>SDT: 0986711162</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <i className="fa-solid fa-clock text-2xl text-gray-700 mr-4"></i>
                            <div>
                                <h3 className="text-lg font-semibold">THỜI GIAN LÀM VIỆC</h3>
                                <p>7:00 - 21:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Form gửi thông tin */}
                    <div className="w-full md:w-auto">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold">LUX STORE SẴN SÀNG LẮNG NGHE BẠN</h3>
                        </div>
                        <form action="/LienHe/Feedback" method="post" className="space-y-4">
                            <input
                                type="text"
                                name="ten"
                                placeholder="Họ và tên"
                                className="w-full border border-gray-300 p-2"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 p-2"
                            />
                            <textarea
                                name="ttin"
                                placeholder="Thông tin"
                                className="w-full border border-gray-300 p-2 h-24"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 mt-4 hover:bg-blue-700"
                            >
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />

        </div>

    );
}

export default Contact;
