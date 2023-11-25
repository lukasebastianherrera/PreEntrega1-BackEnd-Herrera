import { Router } from "express";
import {ProductManager, Product} from "../ProductManager.js";

const router = Router();

const productManager = new ProductManager("./Productos.json");
const products = productManager.getProducts();


router.get("/", (req, res) => {
    const limit = req.query.limit;
    if(limit){
    res.json(products.slice(0, limit));
    } else{
    res.json(products)
    }
});

router.get("/:pid", (req, res) => {
    const pid = Number(req.params.pid);
    const product = productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.send(`el producto con el id ${pid} no existe`);
    }
});

router.post("/", (req, res) =>{
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.json({ 
            error: "Todos los campos son obligatorios" 
        });
    }

    const productCodeRepetido = products.some((product) => product.code === code);
    if (productCodeRepetido) {
        console.log(`EL CAMPO DE  ${code} SE REPITE `);
        return res.status(500).json({
            error: "hubo un error, code repetido"
    });
    }

    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    products.push({
        id: Number(id),
        title,
        description,
        code, 
        price, 
        stock, 
        category, 
        thumbnails,
    })

    res.json({
        status: "creado",
    })



})
router.put("/:pid", (req, res) => {

});
router.delete("/:pid", (req, res) => {

});

export default router;
