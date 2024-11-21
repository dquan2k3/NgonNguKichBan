import * as authServices from '../services/auth'

export const register =  async (req, res) => {
    const { account, password, repassword } = req.body;
    console.log(account)
    try{
        if(!account || !password || !repassword) return res.status(400).json({success: false, err: 1, msg: 'Chưa nhập đủ thông tin!'});
        if(password != repassword) return res.status(200).json({success: false, err: 2, msg: 'mật khẩu chưa trùng nhau'});
        const response = await authServices.registerServices(req.body);
        return res.status(200).json(response);
    }
    catch(error){
        return res.status(500).json({
            success: false,
            err: -1,
            msg:'Lỗi controller' + JSON.stringify(error)
        })
    }
}

export const login = async (req, res) =>{
    try {
        const response = await authServices.loginServices(req.body);
        return res.status(200).json(response)
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg:'Lỗi controller' + JSON.stringify(error)
        })
    }
}