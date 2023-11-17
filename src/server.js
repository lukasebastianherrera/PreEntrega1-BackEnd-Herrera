import express from "express"
import {ProductManager} from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productos = [
	{
		"title": "televisor 101'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 102'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 103'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 104'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 105'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 106'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 107'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 108'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 109'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	},
	{
		"title": "televisor 110'",
		"description": "producto caro",
		"price": "99999",
		"thumbnail": "ejemplo.jpg",
		"code": "codigo123",
		"stock": "999"
	}
]


app.get("/", (request, response) => {
    response.send("<h1>Bienvenido Tutor 👌 </h1>")
} )
app.get("/products", (req, res) => {
  const limit = req.query.limit;
  if(limit){
    res.json(productos.slice(0, limit));
  } else{
    res.json(productos)
  }
  });

app.listen(8080, () =>  console.log(`servidor escuchando en 8080`))