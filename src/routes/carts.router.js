import { Router } from "express";

const router = Router();

const carts = []

router.post("/", (req, res) => {
    const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    carts.push({
        id: Number(id),
        products: [],
    })  
    res.json({
        status: "Carrito creado",
        carts,
    })
})

router.get("/:id", (req, res) =>{
    const { id } = req.params;

    const cart = carts.find((cart) => cart.id === Number(id));

    if (!cart) {
        return res.json({
            error: `Error el carrito con id: ${id} no existe`
        });
    } else {
        res.send(cart)
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
