const {check} = require('express-validator')

exports.productValidation = [
    check('product_name','Product Name is required').not().isEmpty(),
    check('product_detail','Product Detail is necessary').not().isEmpty(),
    check('product_category','Fill Product category').not().isEmpty(), 
    check('product_price','Give the price to product').not().isEmpty(),
    check('product_owner', 'Who is Product Owner? ').not().isEmpty()
]