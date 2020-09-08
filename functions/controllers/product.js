const firebase = require('../firebase');
const db = firebase.admin.firestore();
const productsRef = db.collection('products');
const catesRef = db.collection('categories');

exports.getProductsBySubCategoryId = async (req, res) => {
  const subCateId = parseInt(req.params.subCateId);
  const snapshot = await productsRef.where('category_id', '==', subCateId).get();
  const products = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    products.push(data);
  });

  res.status(200).send(JSON.stringify(products));
}


exports.getProductsByCateoryId = async (req, res) => {
  const limit = 20;
  // const page = req.query.page || 1;
  const cateId = parseInt(req.params.cateId);
  const cateSnapshot = await catesRef.where('parent_category_id', '==', cateId).get();
  const subCateIds = [];

  cateSnapshot.forEach(doc => {
    const data = doc.data();
    subCateIds.push(data['category_id']);
  })

  const prodSnapshot = await productsRef.where('category_id', 'in', subCateIds).limit(limit).get();
  const products = [];

  prodSnapshot.forEach(doc => {
    const data = doc.data();
    products.push(data);
  })

  res.status(200).send(JSON.stringify(products));
}