import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

import * as userRoutes from './routes/userRoutes.js';
import * as productsRoutes from './routes/productRoutes.js';
import * as stripeRoutes from './routes/stripeRoutes.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';

import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
connectToDatabase();

app.use(userRoutes.router);
app.use(productsRoutes.router);
app.use(stripeRoutes.router);

AdminJS.registerAdapter(AdminJSMongoose)
const adminJs = new AdminJS({
    resources: [User, Product],
    rootPath: '/admin',
});


const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'public')));




app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
