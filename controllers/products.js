const products = []

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {
    products.push({title: req.body.title})
    console.log(req.body)
    res.redirect("/")
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Add Product',
        path: '/',
        hasProducts: products.length > 0,
        activeShop :true,
        productCSS : true
    })
}