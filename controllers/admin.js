const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const description = req.body.description
    const price = req.body.price

    req.user
        .createProduct({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
        })
        .then(result => {
            console.log(result)
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        })

};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit

    if (!editMode) {
        return res.redirect('/')
    }

    const prodId = req.params.productId

    req.user
        .getProducts({where : {id : prodId}})
        .then(products => {
            const product = products[0]
            if (!product) {
                return res.redirect('/')
            }

            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const description = req.body.description
    const price = req.body.price

    Product.findByPk(productId)
        .then(product => {
            product.title = title
            product.imageUrl = imageUrl
            product.description = description
            product.price = price

            return product.save()
        })
        .then(result => {
            console.log('UPDATED Product!')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProducts = (req, res, next) => {
//    Product.findAll()
    req.user
        .getProducts()
        .then(rows => {
            res.render('admin/products', {
                prods: rows,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.findByPk(productId)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            console.log("Product Deleted")
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })

}