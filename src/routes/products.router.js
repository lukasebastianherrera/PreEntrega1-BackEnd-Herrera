import { Router } from "express";
import {ProductManager} from "../ProductManager.js";

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
})
router.put("/:pid", (req, res) => {
    
});
router.delete("/:pid", (req, res) => {

});

export default router;
