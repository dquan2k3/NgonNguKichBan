import AHeader from "./AHeader"
import { useState, useEffect, useRef } from "react"
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const Setting = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(1);
    const [alter, setAlter] = useState({
        id: '',
        publicid: '',
    });

    const [image, setImage] = useState(null); // Lưu trữ ảnh đã chọn
    const [loading, setLoading] = useState(false); // Quản lý trạng thái loading
    const [error, setError] = useState(null); // Quản lý lỗi nếu có
    const [url, setUrl] = useState('')

    const [imageshop, setImageshop] = useState(null);
    const [urlshop, setUrlshop] = useState('')
    const [errorshop, setErrorshop] = useState(null);
    const [loadingshop, setLoadingshop] = useState(false);

    const [imagehome, setImagehome] = useState(null);
    const [urlhome, setUrlhome] = useState('')
    const [homebanner, setHomebanner] = useState([])
    const [errorhome, setErrorhome] = useState(null);
    const [loadinghome, setLoadinghome] = useState(false);

    const MySwal = withReactContent(Swal);
    const divRefs = useRef([]);

    const handleShowPopup = () => {
        MySwal.fire({
            icon: "success", // Icon của popup
            title: "Done!", // Tiêu đề
            text: "Thành công!", // Nội dung
            timer: 1000, // Hiển thị trong 1 giây
            showConfirmButton: false, // Ẩn nút OK
            position: "top-start", // Vị trí góc trên bên trái
            toast: true, // Hiển thị dưới dạng thông báo nhỏ (toast)
        });
    };

    useEffect(() => {
        const pd = document.getElementById('setting');
        if (pd) {
            pd.classList.add('!text-purple-600', '!bg-white');
        }
        loadBanner();
        loadBannershop();
        loadBannerhome();

    }, [])

    const loadBanner = () => {
        dispatch(actions.loadBanner())
            .then((response) => {
                if (response.data.success) {
                    setUrl(response.data.Url)
                }
                else {
                    setUrl(response.data.msg);
                }
            })
    }

    const loadBannershop = () => {
        dispatch(actions.loadBannershop())
            .then((response) => {
                if (response.data.success) {
                    setUrlshop(response.data.Url)
                }
                else {
                    setUrlshop(response.data.msg);
                }
            })
    }

    const loadBannerhome = () => {
        dispatch(actions.loadBannerhome())
            .then((response) => {
                if (response.data.success) {
                    setHomebanner(response.data.list)
                }
                else {
                    console.log(response)
                }
            })
    }


    // Hàm chuyển tab
    const switchTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    // Hàm xử lý khi người dùng chọn file ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Lưu file ảnh vào state
        }
    };

    const handleImageshopChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageshop(file); // Lưu file ảnh vào state
        }
    };

    const handleImagehomeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagehome(file); // Lưu file ảnh vào state
        }
    };

    const handleDeletebannerhome = (publicId) => {
        dispatch(actions.deleteBannerhome({ publicId }))
            .then((response) => {
                if (response.data.success) {
                    loadBannerhome()
                    handleShowPopup()
                }
                else {
                    alert(response.data.msg)
                }
            })
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError('Vui lòng chọn 1 ảnh để upload');
            return;
        }
        setError('');

        const formData = new FormData();
        formData.append('file', image);



        try {
            // const response = await fetch('http://localhost:5000/api/uploadBanner', { // URL của server Node.js
            //     method: 'POST',
            //     body: formData,
            // });
            setLoading(true);
            dispatch(actions.uploadBanner({ formData }))
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);
                        setUrl(response.data.Url)
                        handleShowPopup()
                    }
                    else {
                        setError(response.data.msg);
                        setLoading(false);
                    }
                })

            // const data = await response.json();
            // if (data.success) {
            //     alert('Image uploaded successfully');
            //     console.log(data.imageUrl); // URL ảnh từ Cloudinary trả về
            // } else {
            //     throw new Error(data.message || 'Image upload failed');
            // }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmitshop = async (e) => {
        e.preventDefault();

        if (!imageshop) {
            setErrorshop('Vui lòng chọn 1 ảnh để upload');
            return;
        }
        setErrorshop('');

        const formData = new FormData();
        formData.append('file', imageshop);

        try {
            setLoadingshop(true);
            dispatch(actions.uploadBannershop({ formData }))
                .then((response) => {
                    if (response.data.success) {
                        setLoadingshop(false);
                        setUrlshop(response.data.Url)
                        handleShowPopup()
                    }
                    else {
                        setErrorshop(response.data.msg);
                        setLoadingshop(false);
                    }
                })
        } catch (error) {
            setErrorshop(error.message);
        }
    };

    const handleSubmithome = async (e) => {
        e.preventDefault();

        if (!imagehome) {
            setErrorhome('Vui lòng chọn 1 ảnh để upload');
            return;
        }
        setErrorhome('');

        const formData = new FormData();
        formData.append('file', imagehome);

        try {
            setLoadinghome(true);
            dispatch(actions.uploadBannerhome({ formData }))
                .then((response) => {
                    if (response.data.success) {
                        setLoadinghome(false);
                        setUrlhome(response.data.Url)
                        handleShowPopup()
                        loadBannerhome()
                    }
                    else {
                        setErrorhome(response.data.msg);
                        setLoadinghome(false);
                    }
                })
        } catch (error) {
            setErrorhome(error.message);
        }
    };

    const handleAlter = async (e) => {
        e.preventDefault();

        if (!imagehome) {
            setErrorhome('Vui lòng chọn 1 ảnh để upload');
            return;
        }

        if (!alter.id) {
            setErrorhome('Vui lòng chọn 1 ảnh để upload');
            return;
        }

        setErrorhome('');

        const formData = new FormData();
        formData.append('file', imagehome);
        formData.append('alter', JSON.stringify(alter));

        dispatch(actions.alterBannerhome({ formData }))
            .then((response) => {
                if (response.data.success) {
                    setLoadinghome(false);
                    setUrlhome(response.data.Url)
                    handleShowPopup()
                    loadBannerhome()
                }
                else {
                    setErrorhome(response.data.msg);
                    setLoadinghome(false);
                }
            })
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra nếu tất cả các div không chứa target của sự kiện
            const clickedOutsideAllDivs = divRefs.current.every(
                (ref) => ref && !ref.contains(event.target)
            );

            if (clickedOutsideAllDivs) {
                setAlter({ id: '', publicId: '' }) // Click nằm ngoài tất cả các div
            }
        };

        // Thêm sự kiện click vào document
        document.addEventListener("click", handleClickOutside);

        // Xóa sự kiện khi component bị unmounted
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);




    return (
        <div className='bg-[#F3F4F6]'>
            <AHeader />
            <div name='container' s className='pl-20 pt-20 w-full h-screen '>
                <div name='task' className='m-3'>
                    {/*   main                   */}
                    <div className="w-full h-full mx-auto mt-0">
                        {/* Tab headers */}
                        <div className="flex justify-start gap-3">
                            <button
                                className={`py-2 px-4 rounded-t-lg text-white ${activeTab === 1 ? 'bg-blue-500' : 'bg-gray-500'}`}
                                onClick={() => switchTab(1)}
                            >
                                Banner trang chủ
                            </button>
                            <button
                                className={`py-2 px-4 rounded-t-lg text-white ${activeTab === 2 ? 'bg-blue-500' : 'bg-gray-500'}`}
                                onClick={() => switchTab(2)}
                            >
                                Banner cửa hàng
                            </button>
                            <button
                                className={`py-2 px-4 rounded-t-lg text-white ${activeTab === 3 ? 'bg-blue-500' : 'bg-gray-500'}`}
                                onClick={() => switchTab(3)}
                            >
                                Banner giới thiệu
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-4 w-full h-[800px] border-2 border-gray-300 rounded-b-lg overflow-auto relative">
                            <div className={`transition-opacity absolute h-[97%] w-[98%] duration-500 ease-in-out ${activeTab === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                {activeTab === 1 && <div className="h-[97%] w-full">
                                    <div className="h-[90%] w-full flex flex-wrap gap-y-2 gap-x-[5%] content-start overflow-auto">
                                        {homebanner.map((item, index) => (
                                            <div key={index} ref={(el) => (divRefs.current[index] = el)} onClick={() => setAlter({ id: item._id, publicid: item.CloudId })} className={`${alter.id == item._id ? 'bg-blue-400' : ''} hover:bg-blue-300 cursor-pointer w-[30%] h-[48%] border-2 border-gray-400 flex p-2`}>
                                                <div className="w-[80%] h-full">
                                                    <img src={item.Url} alt='homebanner' className="w-full h-full" />
                                                </div>
                                                <div className="flex-1 flex justify-center items-end">
                                                    <button onClick={() => handleDeletebannerhome(item.CloudId)} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Xóa</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-[10%]"><form ref={(el) => (divRefs.current[9999] = el)} onSubmit={handleSubmithome} className="absolute bottom-0">
                                        <div className="pb-2">
                                            <label htmlFor="image">Chọn ảnh để thay banner : </label>
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleImagehomeChange}
                                            />
                                        </div>

                                        {errorhome && <p style={{ color: 'red' }}>{errorhome}</p>}

                                        <button disabled={loadinghome} type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            {loadinghome ? 'Uploading...' : 'Thêm ảnh'}
                                        </button>
                                        <button ref={(el) => (divRefs.current[9999] = el)} disabled={loadinghome} type="button" onClick={handleAlter} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
                                            {loadinghome ? 'Uploading...' : 'Thay ảnh'}
                                        </button>
                                    </form></div>
                                </div>}
                            </div>

                            <div className={`transition-opacity absolute duration-500 h-[97%] ease-in-out ${activeTab === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                {activeTab === 2 && <div className="h-[85%]">
                                    <div className="h-[85%]">
                                        <div className="flex justify-center items-center my-auto h-full">
                                            <img
                                                src={urlshop ? urlshop : "https://res.cloudinary.com/dwlsi7aau/image/upload/v1731775452/ojyx1doh5yyxuxi8cfaa.jpg"}
                                                alt="About Us"
                                                className="w-[1775px] h-[450px] object-cover rounded-lg shadow-lg"
                                            />
                                        </div>
                                        <form onSubmit={handleSubmitshop} className="absolute bottom-0">
                                            <div>
                                                <label htmlFor="image">Chọn ảnh để thay banner : </label>
                                                <input
                                                    type="file"
                                                    id="image"
                                                    accept="image/*"
                                                    onChange={handleImageshopChange}
                                                />
                                            </div>

                                            {errorshop && <p style={{ color: 'red' }}>{errorshop}</p>}

                                            <button disabled={loadingshop} type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                {loadingshop ? 'Uploading...' : 'Thêm ảnh'}
                                            </button>
                                        </form>
                                    </div>
                                </div>}
                            </div>

                            <div className={`transition-opacity absolute duration-500 h-[97%] w-[97%] ease-in-out ${activeTab === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                {activeTab === 3 && <div className="">
                                    <div className="">
                                        <div className="flex justify-center items-center my-auto">
                                            <img
                                                src={url ? url : "https://res.cloudinary.com/dwlsi7aau/image/upload/v1731775452/ojyx1doh5yyxuxi8cfaa.jpg"}
                                                alt="About Us"
                                                className="w-full h-auto max-w-4xl rounded-lg shadow-lg"
                                            />
                                        </div>
                                        <form onSubmit={handleSubmit} className="absolute bottom-0">
                                            <div>
                                                <label htmlFor="image">Chọn ảnh để thay banner : </label>
                                                <input
                                                    type="file"
                                                    id="image"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </div>

                                            {error && <p style={{ color: 'red' }}>{error}</p>}

                                            <button disabled={loading} type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                {loading ? 'Uploading...' : 'Thêm ảnh'}
                                            </button>
                                        </form>
                                    </div>
                                </div>}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Setting