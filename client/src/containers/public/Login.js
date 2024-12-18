import React, { useState, useLocation, useEffect } from 'react';
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import { apiLogin, apiRegister} from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth)


//  const location = useLocation();
  const [isRegister, setIsRegister] = useState('');
  const [error, setError] = useState('');
  const [payload, setPayload] = useState({
      account: '',
      password: ''
  })

  useEffect(() =>{
    if (isLoggedIn) {
      navigate('/home');
    }
  },[isLoggedIn])

  // useEffect(() => {
  //     setIsRegister(location.state?.flag)
  // },[location.state?.flag])
  
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPayload((prevPayload) => ({
        ...prevPayload,
        [name]: value,
      }));
    };

  const handleLogin = async (e) => {
      e.preventDefault()
      dispatch(actions.login(payload))
       .then((response) => {
        if(!response.data.success){
          setError(response.data.msg)
        }
       })
  }
  const testLogout = async (e) => {
    dispatch(actions.logout())
  }

  return (
    <div>
      <Header />
      <BHeader />
      <div className="flex items-center justify-center m-28 bg-cover bg-center" style={{ backgroundImage: 'url(/MainIMG/Dangnhap.png)' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 w-[650px] relative flex flex-col items-center">
          {/* Title */}
          <div className="w-full h-20 flex justify-center items-center bg-gradient-to-tr from-purple-200 to-purple-400 absolute top-0 rounded-t-lg">
            <h2 className="text-white text-2xl font-semibold">Đăng nhập</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-24 w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center mb-4">
              <input type="email" name='account' value={payload.account} onChange={handleInputChange} className="w-96 p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none bg-blue-50" placeholder="Email" />
              <input type="password" name='password' value={payload.password} onChange={handleInputChange} className="w-96 p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none bg-blue-50" placeholder="Mật khẩu" />
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-600">Ghi nhớ đăng nhập</p>
            </div>

            {/* Submit button */}
            <p className='text-red-600 pb-3'>{error}</p>
            <button id='login' type='submit' class="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 rounded-lg hover:bg-opacity-80 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:from-blue-300 hover:to-blue-500 duration-300">
              Đăng nhập
            </button>
          </form>
          {/* <button onClick={testLogout} class="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 rounded-lg hover:bg-opacity-80 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:from-blue-300 hover:to-blue-500 duration-300">
              Đăng xuất
            </button> */}

          {/* Links for forgot password and register */}
          <div className="bottom-4 flex flex-col items-center">
            <a onClick={() => navigate('/forgotpassword')} className="text-purple-700 cursor-pointer text-lg mb-2 underline">Quyên mật khẩu?</a>
            <div className="flex items-center">
              <p className="text-lg">Bạn chưa có tài khoản?</p>
              <a onClick={() => navigate('/register')} className="text-purple-700 cursor-pointer text-lg ml-2 underline">Đăng ký ngay</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
