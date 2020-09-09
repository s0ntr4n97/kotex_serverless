const firebase = require('../firebase');
const db = firebase.admin.firestore();
const catesRef = db.collection('categories');

exports.getSubCategories = async (req, res) => {
  const parentCateId = parseInt(req.params.cateId);
  const snapshot = await catesRef.where('parent_category_id', '==', parentCateId).get();
  const cates = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    cates.push(data);
  });

  res.status(200).send(JSON.stringify(cates));
}

exports.getAllCategories = async (req, res) => {
  const snapshot = await catesRef.get();
  const cates = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    cates.push(data);
  });

  res.status(200).send(JSON.stringify(cates));
}