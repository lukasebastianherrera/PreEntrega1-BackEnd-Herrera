import { Router } from "express";
import { CartManager, Cart } from "../CartManager.js";

const router = Router();

const cartManager = new CartManager("./Carritos.json")



router.post("/", async (req, res) => {
    const carts = cartManager.getCarts();
    const {quantity , products } =  req.body;
    const cart = new Cart(products, quantity)
    try{
        await cartManager.saveCarts(cart); 
        res.json({
            status: "creado",
            cart,
        })
    }  catch(e) {
        console.error("error al crear el carrito", e)
        res.status(500).json({
            error: "Hubo un error al crear el carrito",
            details: error.message
        });

    }
    cartManager.saveCarts(); 
    // ejemplo para enviar desde postman
    // {
    //     "products": []
    // }
})

router.get("/:cid", async (req, res) =>{
    const cid = Number(req.params.cid);

    try {
        const cart = await cartManager.getCartById(cid);
        if (cart) {
            res.json({
                ID: cart.id,
                products: cart.products,
            });
        } else {
            res.json({
                error: `El carrito con el id ${cid} no fue encontrado`,
            });
        }
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.json({
            error: "Hubo un error al obtener el carrito",
        });
    }
});
// http://localhost:8080/api/carts/ (enviar {} desde body)

router.post("/:cid/product/:pid", (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    const cart = carts.find(cart => cart.id === cartId);
    if(!cart){
        return res.json({
            error: "carrito no encontrado"
        })
    }
    const productoExistente = cart.products.find(product => product.id === productId);

    if(productoExistente){
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({
            id: productId,
            quantity: quantity
        })  
    }
    res.json({
        status: "Producto agregado al carrito",
        cartId: cartId
    });
})


export default router;
