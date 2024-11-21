import React from "react";
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';

const ForgotPassword = () => {
    return (
        <div>
            <Header />
            <BHeader />
            <div>
                <div className="flex items-center justify-center m-28 bg-cover bg-center" style={{ backgroundImage: 'url(/MainIMG/Dangnhap.png)' }}>
                    <div className="bg-white rounded-lg shadow-lg p-8 w-[650px] relative flex flex-col items-center">
                        <div className="w-full h-20 flex justify-center items-center bg-gradient-to-tr from-purple-200 to-purple-400 absolute top-0 rounded-t-lg">
                            <h2 className="text-white text-2xl font-semibold">Quyên mật khẩu</h2>
                        </div>
                        <form className="w-full flex flex-col items-center mb-4 pt-16">
                            <h1 class="text-blacsk text-2xl font-semibold">Nhập email đã dùng để đăng ký</h1>
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    className="w-96 mt-6 p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none bg-blue-50"
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-[586px] bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 rounded-lg hover:bg-opacity-80 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:from-blue-300 hover:to-blue-500 duration-300">
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default ForgotPassword;
