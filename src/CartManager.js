import fs from "fs"

class CartManager{
    constructor(path){
        this.path = path;
    try {
        let carts = fs.readFileSync(this.path, "utf-8");
        this.carts = JSON.parse(carts);
    } catch (error) {
        if (error.code === 'ENOENT') {
            fs.writeFileSync(this.path, '[]');
            this.carts = [];
        } else {
            console.error("Error al leer el archivo JSON:", error);
            this.carts = [];
        }
    }
    }
    async getCarts(){
        return this.carts
    }

    async saveCarts(cart){
        if (!cart) {
            return console.log("No hay Carrito", this.carts);
            }
        const cartExist = this.carts.find((c) => c.id === cart.id);
        if (cartExist) {
            console.log("El carrito ya existe");
            throw Error(`Carrito con el id ${product.id} ya existe`);
            }
        cart.id = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
        try {
            this.carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t")
            );
        } catch (error) {
            console.log(`Hubo un error al guardar el carrito: ${error}`);
            throw Error("Hubo un error al crear el carrito: " + error);
            }
    }
    async getCartById(id){
        const carts =  await this.getCarts();
        const cart = carts.find((cart) => cart.id === id);
        if(!cart) {
            console.log("El carrito no fue encontrado :( ")
        }
        return cart;
    }
}

class Cart{
    constructor(products, quantity){
        this.products = products;
        this.quantity = quantity;
    }
}


export { CartManager, Cart }