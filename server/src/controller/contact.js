import * as ContactServices from '../services/contact'


export const upContact = async (req, res) => {
    const {email, hoten, mess} = req.body;
    const data = await ContactServices.upContact({email, hoten, mess});
    if(data.success){
        
        return res.json({ success: true, msg: data.msg });
    }
    else{
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }
}

export const loadContact = async (req, res) => {
    const { page } = req.body;
    const data = await ContactServices.loadContact({page});
    if(data.success){
        
        return res.json({ success: true, list: data.list, totalPages: data.totalPages });
    }
    else{
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }

}

export const readContact = async (req, res) => {
    const { _id } = req.body;
    const data = await ContactServices.readContact({_id});
    if(data.success){
        
        return res.json({ success: true});
    }
    else{
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }

}