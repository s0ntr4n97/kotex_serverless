const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });

const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cors)


const categoryControllers = require('./controllers/category');
const productControllers = require('./controllers/product');

api.get('/category/:cateId/sub-category', categoryControllers.getSubCategories);
api.get('/category/:cateId/sub-category/:subCateId/product', productControllers.getProductsBySubCategoryId);
api.get('/category/:cateId/product', productControllers.getProductsByCateoryId);


exports.api = functions.https.onRequest(api);





