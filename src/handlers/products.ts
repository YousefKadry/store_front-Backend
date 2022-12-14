import express, { Request, Response } from 'express'
import { product, products } from '../models/product'
import verifyAuthToken from './middlewares'


const myProduct = new products()


const index = async (req: Request, res: Response): Promise<void> =>{
    try{    
        const results = await myProduct.index();
        res.json(results)
    }
    catch (err) {
        res.status(400)
        res.json(err)
    }
    
}

const show = async (req: Request, res: Response): Promise<void> =>{
    try{
        const results = await myProduct.show(req.params.id);
        res.json(results);
    }
    catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response): Promise<void> =>{
    try{    
        const prod: product = {
            id: '0',
            name: req.body.name,
            price: req.body.price
        }
        const results = await myProduct.create(prod);
        res.json(results);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res:Response): Promise<void> =>{
    try{
    const deleted = await myProduct.delete(req.params.id)
    res.json(deleted)
}
    catch (err) {
        res.status(400)
        res.json(err)
    }
}

const product_routes = (app: express.Application) =>{
    app.get('/products', index)
    app.post('/products', verifyAuthToken, create)
    app.get('/products/:id', show)
    app.delete('/products/:id', verifyAuthToken, destroy)
}

export default product_routes