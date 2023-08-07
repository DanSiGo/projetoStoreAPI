
// importando a biblioteca express (facilita criação aplicativos web e api)
const express = require('express')  

// importando a biblioteca axios (simplifica solicitações http e respostas)
const axios = require('axios')
const ejs = require('ejs')

// instanciando uma aplicação express
const app = express()


app.set('view engine', 'ejs') 

app.get('/', async (req, res) => {  // criando uma função assíncrona para consumir uma api
    try{
        // utilizando o axios com metodo get para obter dados da api
        // salvando em uma variavel chamada response (nome comumente utilizado)
        // por ser assincrono precisa do método await
        const response = await axios.get('https://fakestoreapi.com/products') 
        // isso retorna uma promise, precisa ser captado os dados
        // para captar os dados da promise, buscamos o atributo .data do objeto response
        const products = response.data
        // renderizar o resultado na pagina
        res.render('products', { products })

    }
    // try e catch são usados para tentar alcançar um objetivo ou captar o erro
    catch (error) {
        console.log(error)
    }
})

app.get('/eletronicos', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/category/electronics')
        const products_elet = response.data
        res.render('products_elet', { products_elet })
    }
    catch (error) {
        console.log(error)
    }
})

app.get('/joias', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/category/jewelery')
        const products_joia = response.data
        res.render('products_joia', { products_joia })
    }
    catch (error) {
        console.log(error)
    }
})

app.get('/vestuario', async (req, res) => {
    try {
        const responseM = await axios.get("https://fakestoreapi.com/products/category/men's clothing")
        const responseF = await axios.get("https://fakestoreapi.com/products/category/women's clothing")
        const men = responseM.data
        const women = responseF.data
        const products_vest = [...men, ...women]  // coletou os materiais internos de men e women e adicionou a um array 
        res.render('products_vest', { products_vest }) // uma vez criado o array com os materiais, passamos para o html
    }
    catch (error) {
        console.log(error)
    }
})

app.listen(3000, () => {
    console.log('Server ON, port 3000')
})