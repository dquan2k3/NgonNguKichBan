import React, { useEffect, useState } from "react";
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isRegister, setIsRegister] = useState('');
    const [error, setError] = useState('');
    const { isLoggedIn } = useSelector(state => state.auth)
    const [payload, setPayload] = useState({
        account: '',
        password: '',
        repassword: '',
    })

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn])

    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPayload((prevPayload) => ({
            ...prevPayload,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        dispatch(actions.register(payload))
            .then((response) => {
                if(!response.data.success){
                    setError(response.data.msg)
                }
            })
    }

    return (
        <div>
            <Header />
            <BHeader />
            <div className="flex items-center justify-center m-28 bg-cover  bg-center" style={{ backgroundImage: 'url(/MainIMG/Dangnhap.png)' }}>
                <div className="bg-white rounded-lg shadow-lg p-0 w-[650px] relative flex flex-col items-center">
                    <div className="w-full h-20 flex justify-center items-center bg-gradient-to-tr from-purple-200 to-purple-400 top-0 rounded-t-lg">
                        <h2 className="text-white text-2xl font-semibold">Đăng ký</h2>
                    </div>

                    <form onSubmit={handleRegister} className="w-full flex flex-col items-center mb-4 pt-12">
                        <div className="space-y-2">
                            <input
                                type="email"
                                name="account"
                                value={payload.account}
                                onChange={handleInputChange}
                                className="w-96 p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none bg-blue-50"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <input
                                type="password"
                                name="password"
                                value={payload.password}
                                onChange={handleInputChange}
                                className="w-96 p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none bg-blue-50"
                                placeholder="Mật khẩu"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <input
                                type="password"
                                name="repassword"
                                value={payload.repassword}
                                onChange={handleInputChange}
                                className="w-96 p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none bg-blue-50"
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                        </div>

                        <p className="text-red-600 pb-3">{error}</p>
                        <button
                            type="submit"
                            className="w-[586px] bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 rounded-lg hover:bg-opacity-80 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:from-blue-300 hover:to-blue-500 duration-300">
                            Đăng ký
                        </button>
                    </form>

                    <div className="text-center mt-2 pb-4">
                        <p className="text-lg text-black">Bạn đã có tài khoản?</p>
                        <a onClick={() => navigate('/login')} className="text-purple-700 cursor-pointer text-lg ml-2 underline">Đăng nhập</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default Register;
