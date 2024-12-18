import * as OrderServices from '../services/order'

export const loadOrder = async (req, res) => {
    const { page } = req.body;
    const data = await OrderServices.loadOrder({page});
    if(data.success){
        
        return res.json({ success: true, list: data.list, totalPages: data.totalPages });
    }
    else{
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }

}

export const done = async (req, res) => {
    const { _id } = req.body;
    const data = await OrderServices.done({_id});
    if(data.success){
        
        return res.json({ success: true});
    }
    else{
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }

}