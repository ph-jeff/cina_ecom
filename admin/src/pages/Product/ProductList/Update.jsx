import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import UploadImage from "../../../components/UploadImage";
import LinkButton from "../../../components/LinkButton";
import ActionButton from "../../../components/ActionButton";
import ProductLayout from "../components/ProductLayout";
import api from "../../../services/apiRequest";

const Update = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(1);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [featured, setFeatured] = useState(false);
    const navigate = useNavigate();

    const [isOnSale, setIsOnSale] = useState(false);
    const [discount, setDiscount] = useState('');
    const [saleStartDate, setSaleStartDate] = useState('');
    const [saleEndDate, setSaleEndDate] = useState('');

    function fetchProduct() {
        api.get(`/api/admin/product/update/${id}`)
            .then(response => {
                console.log(response.data);
                setName(response.data.name);
                setQuantity(response.data.quantity);
                setPrice(response.data.price);
                setCategory(response.data.category)
                setBrand(response.data.brand)
                setDescription(response.data.description)
                setImage(response.data.img_url)
                setFeatured(response.data.is_featured)
                setIsOnSale(response.data.sale.is_sale || false)
                setDiscount(response.data.sale.discount || "")
                
                const unparse_start = new Date(response.data.sale.start);
                let year = unparse_start.getUTCFullYear();
                let month = String(unparse_start.getUTCMonth() + 1).padStart(2, '0');
                let day = String(unparse_start.getUTCDate()).padStart(2, '0');
                setSaleStartDate(response.data.sale.start ? `${year}-${month}-${day}` : "")

                const unparse_end = new Date(response.data.sale.end);
                year = unparse_end.getUTCFullYear();
                month = String(unparse_end.getUTCMonth() + 1).padStart(2, '0');
                day = String(unparse_end.getUTCDate()).padStart(2, '0');
                setSaleEndDate(response.data.sale.end ? `${year}-${month}-${day}` : "")
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }

    function fetchCategory(){
        api.get('/api/admin/category/list')
        .then(response => {
            setCategories(response.data)
            console.log(response)
            setIsLoading(false)
        })
    }

    function fetchBrand(){
        api.get('/api/admin/brand/list')
        .then(response => {
            setBrands(response.data)
            console.log(response.data)
            setIsLoading(false)
        })
    }

    // check and save file into renderable file
    const uploadImage = async (e) => {
        const file = e.target.files[0]
        if (file) {
            // assign to fileUpload
            setFileUpload(file);
            const base64 = await convertBase64(file);
            setImage(base64);
        }
    }

    // convert file into bits that can be pass as image url to render
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // remove uploaded image (rendered)
    function removeImage() {
        setImage(null);
    }

    function setAsfeatured() {
        setFeatured(!featured);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (name == "") {
            alert('No image is selected');
            setIsLoading(false);
            return;
        }
        if (quantity == "") {
            alert('No image is selected');
            setIsLoading(false);
            return;
        }
        if (price == "") {
            alert('No image is selected');
            setIsLoading(false);
            return;
        }
        if (category == "") {
            alert('No image is selected');
            setIsLoading(false);
            return;
        }
        if (description == "") {
            alert('No image is selected');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', fileUpload);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('description', description);
        formData.append('is_featured', featured);
        formData.append('is_sale', isOnSale);
        formData.append('discount', discount);
        formData.append('start', saleStartDate);
        formData.append('end', saleEndDate);

        api.put(`/api/admin/product/update/${id}`, formData)
            .then(({ data }) => {
                console.log(data);
                setIsLoading(false);
                navigate('/product');
            })
            .catch(err => {
                console.log(err.response)
                setIsLoading(false);
                alert(err.response.data.error)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        fetchBrand()
        fetchCategory()
        fetchProduct();
    }, [])

    return (
        <ProductLayout>
            {isLoading && <Loading />}
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="mb-4 flex justify-between">
                    <LinkButton params={'/product'} actionName={'Back'} />
                    <div>
                        <input onChange={setAsfeatured} checked={featured} className="mx-2" type="checkbox" id="featured" />
                        <label htmlFor="featured">Set as featured</label>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="bg-slate-200 p-4 rounded text-gray-800"
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Product name"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                id="quantity"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number"
                                placeholder="Quantity"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                id="price"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                placeholder="Price"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <input
                            id="isOnSale"
                            className="mx-2"
                            type="checkbox"
                            checked={isOnSale}
                            onChange={(e) => {
                                setIsOnSale(e.target.checked)
                                if (!e.target.checked) {
                                    setDiscount("");
                                    setSaleStartDate("");
                                    setSaleEndDate("");
                                }
                            }}
                        />
                        <label htmlFor="isOnSale">Set Product on Sale</label>
                    </div>

                    {isOnSale && (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                                <input
                                    id="discount"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    type="number"
                                    placeholder="Discount percentage"
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="saleStartDate" className="block text-sm font-medium text-gray-700">Sale Start Date</label>
                                <input
                                    id="saleStartDate"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                                    value={saleStartDate}
                                    onChange={(e) => setSaleStartDate(e.target.value)}
                                    type="date"
                                    placeholder="Sale start date"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="saleEndDate" className="block text-sm font-medium text-gray-700">Sale End Date</label>
                                <input
                                    id="saleEndDate"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                                    value={saleEndDate}
                                    onChange={(e) => setSaleEndDate(e.target.value)}
                                    type="date"
                                    placeholder="Sale end date"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" name="" id="category">
                                <option value="">Please Select</option>
                                {categories.map((category) => (
                                    <option value={category.category_name} key={category._id}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Brand</label>
                            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" name="" id="category">
                                <option value="">Please Select</option>
                                {brands.map((brand) => (
                                    <option value={brand.brand_name} key={brand._id}>{brand.brand_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        {/* <input
                            id="description"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Description"
                        /> */}
                        <textarea
                            id="description"
                            className="w-full px-3 py-2 h-[150px] border rounded focus:outline-none focus:ring focus:border-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                        >
                        </textarea>
                    </div>

                    <UploadImage image={image} uploadImage={uploadImage} removeImage={removeImage} />

                    <div className="flex justify-center">
                        <ActionButton actionName={'Save'} />
                    </div>
                </form>
            </div>
        </ProductLayout>

    )
}

export default Update