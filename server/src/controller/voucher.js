import * as VoucherServices from '../services/voucher'

export const addvoucher = async (req, res) => {
    const { name, describe, date } = req.body;
    try {
        if (!name || !describe) return res.json({ success: false, err: 2, msg: 'Chưa nhập đủ thông tin!' });
        const response = await VoucherServices.addvoucher({ name, describe, date });
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

export const loadvoucher = async (req, res) => {
    const { page, voucher } = req.body;
    console.log(page)
    const data = await VoucherServices.loadvoucher({ page, voucher });
    if (data.success) {

        return res.json({ success: true, list: data.list, totalPages: data.totalPages });
    }
    else {
        res.status(400).json({ success: false, err: data.err, msg: data.msg });
    }

}

export const deletevoucher = async (req, res) => {
    const { id } = req.body;
    const response = await VoucherServices.deletevoucher(id);
    console.log(response)
    if (response.success) {

        return res.json({ success: true });
    }
    else {
        res.status(400).json({ success: false });
    }

}

export const altervoucher = async (req, res) => {
    const { id, fname, fdescribe, fdate } = req.body;
    const response = await VoucherServices.altervoucher(id, fname, fdescribe, fdate)
    return res.json({ response })
}