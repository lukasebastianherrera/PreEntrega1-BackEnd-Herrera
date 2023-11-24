import express from "express"
import {ProductManager} from "./ProductManager.js";
import cartsRouter from  "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"

const app = express();
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./Productos.json");
const products = productManager.getProducts();
// productManager.addProduct("producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);


app.get("/", (req, res) => {
    res.send("<h1>Bienvenido Tutor 👌 </h1>")
} )

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter)

app.listen(8080, () =>  console.log(`servidor escuchando en 8080`))