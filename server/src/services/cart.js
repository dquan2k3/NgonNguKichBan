const Cart = require('../Model/cart');

export const getCart = async (session) => {
  try {
    const cart = session.cart || [];
    return { success: true, cart: cart };
  } catch (error) {
    return { success: false, err: -1, msg: 'Lỗi khi lấy giỏ hàng: ' + error.message };
  }
};

export const addToCart = async (session, product) => {
  try {
    if (!session.cart) {
      session.cart = [];
    }

    const isexist = product.product._id
    const productIndex = session.cart.findIndex(item => item.product._id === isexist);
    if (productIndex != -1) {
      session.cart[productIndex].product.Amount += product.product.Amount;
      await new Promise((resolve, reject) => {
        session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      return { success: true, cart: session.cart };
    }


    session.cart = [...session.cart, product];
    await new Promise((resolve, reject) => {
      session.save((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    return { success: true, cart: session.cart };
  } catch (error) {
    console.error('Error in addToCart:', error);
    return { success: false, err: -1, msg: 'Lỗi khi thêm sản phẩm vào giỏ hàng: ' + error.message };
  }
};

export const removeFromCart = async (session, id) => {
  try {
    if (!session.cart) {
      return { success: false, err: 1, msg: 'Chỉ số không hợp lệ hoặc giỏ hàng trống' };
    }

    const productIndex = session.cart.findIndex(item => item.product._id === id);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    session.cart.splice(productIndex, 1);
    await new Promise((resolve) => session.save(resolve));
    return { success: true, cart: session.cart };
  } catch (error) {
    return { success: false, err: -1, msg: 'Lỗi khi xóa sản phẩm: ' + error.message };
  }
};

export const cod = async (session, req, user, address) => {
  const { cart } = session;

  if (!cart || !Array.isArray(cart)) {
    console.log("Cart data is invalid");
  }

  try{
    const cartItems = cart.map((item) => ({
      productId: item.product._id,
      name: item.product.Name,
      productType: item.product.ProductType,
      describe: item.product.Describe,
      image: item.product.Image,
      price: item.product.Price,
      priceSale: item.product.PriceSale,
      amount: item.product.Amount,
    }));
  
    const newCart = new Cart({
      User: user,
      Address: address,
      Items: cartItems,
    });
    await newCart.save()
    session.cart = [];
    return {success: true, cart: session.cart}
  }
  catch(error){
    return{success: false, msg: error}
  }


};

export const updateCartItem = async (session, index, updatedItem) => {
  try {
    if (!session.cart || index < 0 || index >= session.cart.length) {
      return { success: false, err: 1, msg: 'Chỉ số không hợp lệ hoặc giỏ hàng trống' };
    }

    session.cart[index] = { ...session.cart[index], ...updatedItem };
    await new Promise((resolve) => session.save(resolve));
    return { success: true, cart: session.cart };
  } catch (error) {
    return { success: false, err: -1, msg: 'Lỗi khi cập nhật sản phẩm: ' + error.message };
  }
};


export const testtt = async (session) => {
  session.user = {
    username: 'Quan',
    age: 202,
    email: 'dquan2k3@gmail.com'
  }
};
