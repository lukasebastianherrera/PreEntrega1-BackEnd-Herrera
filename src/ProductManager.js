import fs from 'fs'
class ProductManager {
    constructor(path) {
    this.path = path;
    try {
        let products = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(products);
    } catch (error) {
        console.error("Error al leer el archivo JSON:", error);
        this.products = [];
    }
    }

    getProducts(){
        return this.products
    }
    
    addProduct(title, description, price, thumbnail, code, stock) {
        const products = this.getProducts();
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
    const productCodeRepetido = this.products.some((product) => product.code === code);
    if (productCodeRepetido) {
        console.log(`EL CAMPO DE  ${code} SE REPITE `);
        return;
    }
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Falta rellenar un campo");
        return;
    }
    products.push(product);

    fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));

    console.log(`Producto con id: ${id} se añadio`);
    }
    
    getProductById(id) {
    const products = this.getProducts();
    const product = products.find((product) => product.id === id);
    if (!product) {
        console.log(`El producto con el id: ${id} no fue encontrado`);
    }
    return product;
    }
    updateProduct(id, field, value) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        products[index][field] = value;
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
        console.log(`El producto  ${id} se cambio correctamente`);
    } else {
        console.log(`El producto ${id} no se encontro para cambiarse`);
    }
    }
    deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
        console.log(`Product con el ID: ${id} Fue borrado`);
    } else {
        console.log(`El producto con id ${id} No se encontro`);
    }
    }
}

class Product {
    constructor(id, title, description, price, thumbnail, code, stock,){
        this.id = userId; 
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// const productManager = new ProductManager("./Productos.json");
// const products = productManager.getProducts();
//     console.log(products);
// productManager.addProduct("producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
// console.log(products);
// const productByID = productManager.getProductById(1)
// const productByID1 = productManager.getProductById(7)
// const actualizarProducto = productManager.updateProduct(1, "price", 300)
// console.log(products)
// productManager.deleteProduct(1);
// console.log(products);  

export { ProductManager, Product };
