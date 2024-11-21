import * as settingServices from '../services/setting'

export const uploadBanner = async (req, res) => {
    const file  = req.file;
    const data = await settingServices.UploadBanner({file});
    if(data.success){       
        return res.json({ success: true, Url: data.Url });
    }
    else{
        res.json({ success: false, msg: data.msg});
    }    
}

export const loadBanner = async (req, res) => {
    const data = await settingServices.loadBanner();
    if(data.success){       
        return res.json({ success: true, Url: data.Url, err: data.err });
    }
    else{
        res.json({ success: false, msg: data.msg, err: data.err});
    }    
}

export const uploadBannershop = async (req, res) => {
    const file  = req.file;
    const data = await settingServices.UploadBannershop({file});
    if(data.success){       
        return res.json({ success: true, Url: data.Url });
    }
    else{
        res.json({ success: false, msg: data.msg});
    }    
}

export const loadBannershop = async (req, res) => {
    const data = await settingServices.loadBannershop();
    if(data.success){       
        return res.json({ success: true, Url: data.Url, err: data.err });
    }
    else{
        res.json({ success: false, msg: data.msg, err: data.err});
    }    
}

export const uploadBannerhome = async (req, res) => {
    const file  = req.file;
    const data = await settingServices.UploadBannerhome({file});
    if(data.success){       
        return res.json({ success: true, Url: data.Url });
    }
    else{
        res.json({ success: false, msg: data.msg});
    }    
}

export const loadBannerhome = async (req, res) => {
    const data = await settingServices.loadBannerhome();
    if(data.success){       
        return res.json({ success: true, list: data.list });
    }
    else{
        res.json({ success: false, msg: data.msg, err: data.err});
    }
}

export const deleteBannerhome = async (req, res) => {
    const { publicId } = req.body;
    const data = await settingServices.deleteBannerhome({publicId});
    if(data.success){       
        return res.json({ success: true, msg: data.msg });
    }
    else{
        res.json({ success: false, msg: data.msg, err: data.err});
    }
}

export const alterBannerhome = async (req, res) => {
    const file  = req.file;
    const alter = req.body.alter ? JSON.parse(req.body.alter) : {};
    const id = alter.id;
    const publicId = alter.publicid
    const data = await settingServices.alterBannerhome({file, id, publicId});
    if(data.success){       
        return res.json({ success: true, Url: data.Url });
    }
    else{
        res.json({ success: false, msg: data.msg});
    }    
}