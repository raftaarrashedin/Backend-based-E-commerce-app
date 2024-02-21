const {productValidation, validationResult} = require('express-validator')
const db = require('../config/dbConnection')

const createProduct = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const productData = {
        product_name : req.body.product_name,
        product_detail : req.body.product_detail,
        product_category : req.body.product_category,
        product_price : req.body.product_price,
        product_owner : req.body.product_owner
    };

    db.query('INSERT INTO product SET ?',productData,(errors,results) => {
        if(errors){
            console.error('Error Inserting Product',errors);
            return res.status(401).json({errors: "Failed to Insert"});
        }
        console.log('Product Inserted Successfull!');
        return res.status(200).json({message : "Yayyyyyyy, Prodcut Inserted Successfull!"})
    })
    
}


// Functions to handle Update product

const updateProduct = (req,res) => {
    
    const productId = req.params.id;

    const updateProductData = {
        product_name : req.body.product_name,
        product_detail : req.body.product_detail,
        product_category : req.body.product_category,
        product_price : req.body.product_price,
        product_owner : req.body.product_owner 
    };
    db.query('UPDATE product SET ? WHERE id = ?',[updateProductData,productId], (errors,results) => {

        if(errors) {
            console.error('Error Updating Product',errors);
            return res.status(405).json({errors: 'Failed to update product!'})
        }
        console.log(" Product Update Successfull!")
        return res.status(200).json({message : "Product Update Successfull!!!"})
    })
}








module.exports = {
    createProduct
}
// db.query(
    //     `INSERT INTO product(product_name,product_detail,product_category,product_price,product_owner) VALUES(
    //         '${req.body.product_name}',
    //         '${req.body.product_detail}',
    //         '${req.body.product_category}',
    //         '${req.body.product_price}',
    //         '${req.body.product_owner}'
    //     );`
// )