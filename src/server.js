import express from "express"
import {ProductManager} from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./Productos.json");
const products = productManager.getProducts();
productManager.addProduct("producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc223", 25);
productManager.addProduct("producto prueba3", "Este es un producto prueba", 200, "Sin imagen", "abc323", 25);
productManager.addProduct("producto prueba4", "Este es un producto prueba", 200, "Sin imagen", "abc423", 25);
productManager.addProduct("producto prueba5", "Este es un producto prueba", 200, "Sin imagen", "abc523", 25);
productManager.addProduct("producto prueba6", "Este es un producto prueba", 200, "Sin imagen", "abc623", 25);
productManager.addProduct("producto prueba7", "Este es un producto prueba", 200, "Sin imagen", "abc723", 25);
productManager.addProduct("producto prueba8", "Este es un producto prueba", 200, "Sin imagen", "abc823", 25);
productManager.addProduct("producto prueba9", "Este es un producto prueba", 200, "Sin imagen", "abc923", 25);
productManager.addProduct("producto prueba10", "Este es un producto prueba", 200, "Sin imagen", "abc1023", 25);

app.get("/", (req, res) => {
    res.send("<h1>Bienvenido Tutor 👌 </h1>")
} )
app.get("/products", (req, res) => {
  const limit = req.query.limit;
  if(limit){
    res.json(products.slice(0, limit));
  } else{
    res.json(products)
  }
  });
// Rutas para las pruebas :
// http://localhost:8080/products
// http://localhost:8080/products?limit=5

  app.get("/products/:pid", (req, res) => {
    const pid = Number(req.params.pid);
    const product = productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.send(`el producto con el id ${pid} no existe`);
    }
});
// http://localhost:8080/products/2
// http://localhost:8080/products/34123123

app.listen(8080, () =>  console.log(`servidor escuchando en 8080`))