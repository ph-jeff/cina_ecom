const mongoose = require('mongoose');
const slug = require('slug');
const cron = require('node-cron');

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
    stock_threshold: {
        type: Number,
        default: 0,
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
    // size: {
    //     type: [String]
    // },
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
    sale: {
        is_sale: {
            type: Boolean,
            default: false,
        },
        discount: {
            type: Number,
            default: 0,
        },
        start: {
            type: Date,
            default: null,
        },
        end: {
            type: Date,
            default: null,
        }
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

// automatic update every minute
cron.schedule('* * * * *', async () => {
    try {
        // cron.schedule('* * * * *', async () => {});
        const currentDate = new Date();
            // Find products where sale is active and 'to' date is in the past
        const expiredProducts = await Product.find({
            'sale.is_sale' : true,
            'sale.end' : {
                $lt: currentDate
            }
        });

        // Update expired products
        for (const product of expiredProducts) {
            product.sale.is_sale = false;
            product.sale.discount = 0;
            product.sale.start = null;
            product.sale.end = null;

            await product.save();
        }

        if(expiredProducts.length != 0){
            console.log('Products updated successfully. (automatic sale update)');
        }
    } catch (error) {
        console.error('Error updating products:', error);
    }
});