const mongoose = require('mongoose');
const slug = require('slug');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        default: function(){
            return slug(this.name, '-', {lower: true})
        },
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    size: {
        type: [String]
    },
    img_url: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    is_featured: {
        type: Boolean,
        default: false,
    },
    is_archived: {
        type: Boolean,
        default: false,
    }
},{ timestamps: true });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;


async function createProduct(){
    const product = await Product({
        name: 'MSI G56',
        quantity: 45,
        price: 2600,
        img_url: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ab atque sequi debitis ducimus, vitae dolorem. Dolores, aperiam dolore culpa animi officia voluptate similique inventore eligendi molestias ipsam sint eius autem voluptatibus rem optio praesentium! Aliquam dolore numquam itaque repellat, deserunt ipsa minima suscipit, distinctio voluptatibus obcaecati delectus, doloribus perferendis.'
    })
    product.save()
    .then(() => {
        console.log(product)
    })
    .catch(err => {
        console.log(err.message)
    })
}

// createProduct();