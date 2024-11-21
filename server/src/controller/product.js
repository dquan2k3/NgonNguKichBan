import * as ProductService from '../services/product'

export const loadProduct = async (req, res) => {
    const data = await ProductService.loadProduct();
    if(data.success){
        
        return res.json({ success: true, list: data.list });
    }
    else{
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }

}

export const loadProductdetail = async (req, res) => {
    const {id} = req.body;
    const product = await ProductService.loadProductdetail({id});
    if(product.success){
        
        return res.json({ success: true, product: product.product });
    }
    else{
        res.status(400).json({ success: false, err: product.err, msg: product.msg });
    }

}

export const addProduct = async (req, res) => {
    const imagep = req.file;
    const { name, productType, describe, price, priceSale, quantity } = req.body;
    try {
        if (!name || !describe || !productType || !price || !priceSale || !imagep) return res.json({ success: false, err: 2, msg: 'Chưa nhập đủ thông tin!' });
        const response = await ProductService.addProduct({ name, productType, describe, price, priceSale, quantity, imagep });
        console.log(response)
        return res.status(200).json({response});
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Lỗi controller' + JSON.stringify(error)
        })
    }
}

export const alterProduct = async (req, res) => { 
    const fimagep = req.file;
    const { id, fname, fproductType, fdescribe, fprice, fpriceSale, fquantity } = req.body;
    if (!fname || !fdescribe || !fproductType || !fprice || !fpriceSale || !fquantity ) return res.json({ success: false, err: 2, msg: 'Chưa nhập đủ thông tin!' });
    const response = await ProductService.alterProduct({id, fname, fproductType, fdescribe, fprice, fpriceSale, fquantity, fimagep})
    return res.json({response})
}

export const deleteProduct = async (req, res) => {
    const { id } = req.body;
    const response = await ProductService.deleteProduct(id);
    console.log(response)
    if(response.success){
        
        return res.json({ success: true });
    }
    else{
        res.status(400).json({ success: false });
    }

}

