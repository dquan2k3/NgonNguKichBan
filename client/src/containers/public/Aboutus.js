import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'



const Aboutus = () => {
    const dispatch = useDispatch()
    const [url, setUrl] = useState('')
    
    useEffect(() => {
        dispatch(actions.loadBanner())
            .then((response) => {
                if (response.data.success) {
                    setUrl(response.data.Url)
                }
                else {
                    setUrl(response.data.msg);
                }
            })
    }, [])

    return (
        <div>
            <Header />
            <BHeader />
            <div className="flex flex-row space-y-1 mt-[13px]">
                <img
                    src={url}
                    alt="About Us"
                    className="w-[1200px] h-[900px]"
                />
                <div className="flex items-center w-full h-[900px] relative">
                    <div className="w-[1000px] h-[500px] bg-white absolute -ml-[330px] p-[100px] shadow-md border border-gray-400">
                        <h1 className="text-2xl font-semibold mb-4">About Us</h1>
                        <p className="text-gray-700 mb-4">
                            Nơi bạn có thể khám phá sứ mệnh và tâm huyết của chúng tôi trong việc
                            cung cấp những sản phẩm nội thất tinh tế và đẳng cấp. Chúng tôi là đội
                            ngũ các chuyên gia và đam mê nghệ thuật, đang tận tâm làm việc mỗi ngày
                            để biến ý tưởng và mơ ước của bạn về không gian sống lý tưởng thành hiện
                            thực.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Với sứ mệnh đồng hành cùng bạn xây dựng không gian sống đẹp và thoải mái,
                            chúng tôi cam kết mang đến cho bạn những sản phẩm nội thất chất lượng,
                            phong cách và đa dạng, từ các bộ sofa êm ái đến các bộ bàn ăn thanh lịch
                            và các món đồ trang trí độc đáo.
                        </p>
                        <a
                            href="/LienHe" // Đường dẫn hoặc route đến trang Liên hệ
                            className="mt-6 inline-block text-blue-500 border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white"
                        >
                            Liên hệ với chúng tôi
                        </a>
                    </div>
                </div>
            </div>

            <Footer />

        </div>

    )

}

export default Aboutus