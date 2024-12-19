import * as ProductTypeService from '../services/productType'

export const loadProductType = async (req, res) => {
    const { page } = req.body;
    const data = await ProductTypeService.loadProductType({ page });
    if (data.success) {

        return res.json({ success: true, list: data.list, totalPages: data.totalPages });
    }
    else {
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }

}

export const addProductType = async (req, res) => {
    const { name, describe } = req.body;
    try {
        if (!name || !describe) return res.json({ success: false, err: 2, msg: 'Chưa nhập đủ thông tin!' });
        const response = await ProductTypeService.addProductType({ name, describe });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Lỗi controller' + JSON.stringify(error)
        })
    }
}

export const deleteProductType = async (req, res) => {
    const { id } = req.body;
    const response = await ProductTypeService.deleteProductType(id);
    console.log(response)
    if (response.success) {

        return res.json({ success: true });
    }
    else {
        res.status(400).json({ success: false });
    }

}

export const alterProductType = async (req, res) => {
    const { id, fname, fdescribe } = req.body;
    const response = await ProductTypeService.alterProductType(id, fname, fdescribe)
    return res.json({ response })
}