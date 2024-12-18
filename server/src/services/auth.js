import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { accountModel } from '../Model/authModel';
require ('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const registerServices = ({account, password}) => new Promise(async(resolve, reject) =>{
    try{
        const response = await accountModel.findOne({Account: account})
        if(!response){
            const NewRegister = await accountModel({
                Account: account,
                Password: hashPassword(password),
            });
            try {
                await NewRegister.save();
                console.log(NewRegister)
                const token = jwt.sign({id: NewRegister._id, account: NewRegister.Account, role: NewRegister.Role}, process.env.SECRET_KEY, {expiresIn: '2d'})
                resolve({success: true, err: 0, token: token, msg: 'Tạo tài khoản'}) 
            }
            catch (error) {
                reject({ success: false, err: 3, token:null, msg: error }) 
            }  
        }
        else{
            resolve({ success: false, err: 1, token:null, msg: 'Tài khoản đã tồn tại' });
        }
    }
    catch(error) {
        reject({ success: false, err: 3, token:null, msg: error.message || 'Có lỗi xảy ra' });
    }
})

export const loginServices = ({account, password}) => new Promise(async(resolve, reject) =>{
    try {
        const user = await accountModel.findOne({ Account: account});
        if (user) {
            if(bcrypt.compareSync(password, user.Password)){
                const token = jwt.sign({id: user._id, account: user.Account, role: user.Role}, process.env.SECRET_KEY, {expiresIn: '2d'})
                resolve({success: true, err: 0, token: token, msg: 'Đăng nhập thành công!'}) 
            }
        }
        resolve({success: false, err: 1, token:null, msg: 'Tài khoản hoặc mật khẩu không đúng!'}) 
    } 
    catch (error) {
        console.log(error);
        console.log(process.env.SECRETKEY);
        reject({ success: false, err: 3, token:null, msg: 'Lỗi hệ thống' });
    }
})