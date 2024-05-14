//index.js 
//configuração inicial 
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Permitindo o express ler JSON 
//middlewares =  é a maneira de fazer alguma coisa antes da requisição ser processada
app.use(
	express.urlencoded({
		extended: true,
	}),
)
app.use(express.json())

//Rota inical / endpoint
app.get('/', (req, res)=>{
	//Mostrar req
	res.json({message: "Olá, mundo!"})
})

// Permitindo a visualização do express ao navegador postman 
let senha = "123456teste"
mongoose.connect(`mongodb+srv://rafadev:${senha}@cluster0.vtsrted.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log("Conectamos ao mongoDB")
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})