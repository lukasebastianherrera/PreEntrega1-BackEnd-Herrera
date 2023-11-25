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
    const cartId = req.params.id;
    const cart = carts.find(cart => cart.id === cartId);

    if (!cart) {
        return res.json({
            error: "Carrito no encontrado"
        });
    }

    res.json(cart.products);
});


export default router;
