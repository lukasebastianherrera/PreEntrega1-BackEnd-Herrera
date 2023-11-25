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
// http://localhost:8080/api/products/

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

    // ejemplo para enviar desde body  
    // {
    //     "title": "Nuevo Producto1",
    //     "description": "Descripción del nuevo producto",
    //     "code": "ABC123",
    //     "price": 100,
    //     "stock": 100,
    //     "category": "Electrónicos",
    //     "thumbnails": [
    //       "ruta_imagen_1.jpg"
    //     ]
    //   }
})


router.put("/:id", (req, res) => {
    const { id } = req.params; 
    const {title, description, code, price, stock, category, thumbnails } = req.body;

    const index = products.findIndex((user) => user.id === Number(id));
    if(index === -1){
        return res.json({
            error: "Producto no encontrado"
        })
    }

    products[index] = {
        id: Number(id), 
        title,
        description,
        code, 
        price, 
        stock, 
        category, 
        thumbnails,
    }
    
    res.json({
        status: "actualizado",
        producto: {
            id: Number(id), 
            title,
            description,
            code, 
            price, 
            stock, 
            category, 
            thumbnails,
        }
    })
// http://localhost:8080/api/products/1

});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((product) => product.id === Number(id));
    if (index === -1) {
        return res.json({
        error: "Producto no encontrado ",
        });
    }
    
    products.splice(index, 1);
    
    res.json({
        status: "Producto Eliminado",
    });
    });;
// http://localhost:8080/api/products/1

export default router;
