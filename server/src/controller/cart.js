import * as CartService from '../services/cart';

export const getCart = async (req, res) => {
  const response = await CartService.getCart(req.session);
  if (response.success) {
    return res.json({ success: true, cart: response.cart });
  } else {
    return res.status(400).json({ success: false, msg: response.msg });
  }
};

export const testtt = async (req, res) => {
  await CartService.testtt(req.session);
  res.send('ok')

};

export const addToCart = async (req, res) => {
  const product = req.body;
  if (!product) {
    return res.status(400).json({ success: false, msg: 'Không có sản phẩm để thêm' });
  }

  const response = await CartService.addToCart(req.session, product);

  if (response.success) {
    return res.json({ success: true, cart: response.cart });
  } else {
    return res.status(500).json({ success: false, msg: response.msg });
  }
};

export const removeFromCart = async (req, res) => {
  const id = req.params.id
  const response = await CartService.removeFromCart(req.session, id);
  console.log('Controller response : ', response)

  if (response.success) {
    return res.json({ success: true, cart: response.cart });
  } else {
    return res.status(400).json({ success: false, msg: response.msg });
  }
};

export const cod = async (req, res) => {
  const { user, address, keyy, giamgia } = req.body;
  // console.log('user:', user);   // Kiểm tra giá trị của user
  // console.log('address:', address);  // Kiểm tra giá trị của address
  // console.log('key:', keyy);
  const response = await CartService.cod(req.session, user, address, keyy, giamgia);
  console.log(response)
  if (response.success) {
    return res.json({ success: true, cart: response.cart });
  } else {
    return res.json({ success: false, msg: response.msg });
  }
};

export const updateCartItem = async (req, res) => {
  const index = parseInt(req.params.index);
  const updatedItem = req.body;

  const response = await CartService.updateCartItem(req.session, index, updatedItem);

  if (response.success) {
    return res.json({ success: true, cart: response.cart });
  } else {
    return res.status(400).json({ success: false, msg: response.msg });
  }
};


