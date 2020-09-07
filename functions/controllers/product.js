const firebase = require('../firebase');
const db = firebase.admin.firestore();
const catesRef = db.collection('products');

exports.getProductsByCategoryId = async (req, res) => {
  const subCateId = parseInt(req.params.subCateId);
  const snapshot = await catesRef.where('category_id', '==', subCateId).get();
  const products = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    products.push(data);
  });

  res.status(200).send(JSON.stringify(products));
}