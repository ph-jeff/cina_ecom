import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import UploadImage from "../../../components/UploadImage";
import ProductLayout from "../components/ProductLayout";
import LinkButton from "../../../components/LinkButton";
import ActionButton from "../../../components/ActionButton";
import api from "../../../services/apiRequest";
import Loading from '../../../components/Loading';

const Create = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [featured, setFeatured] = useState(false);
    const navigate = useNavigate();

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

        if (!fileUpload) {
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

        api.post('/api/admin/product', formData)
            .then(({ data }) => {
                console.log(data);
                setIsLoading(false);
                navigate('/product')
            })
            .catch(err => {
                console.log(err.response)
                setIsLoading(false);
                alert(err.response.data.error)
            })
    }

    useEffect(() => {
        function fetchCategory(){
            api.get('/api/admin/category')
            .then(response => {
                setCategories(response.data)
            })
        }
        function fetchBrand(){
            api.get('/api/admin/brand')
            .then(response => {
                setBrands(response.data)
                console.log(response.data)
            })
        }
        fetchCategory()
        fetchBrand()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <ProductLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="mb-4 flex justify-between">
                    <LinkButton params={'/product'} actionName={'Back'} />
                    <div>
                        <input onChange={setAsfeatured} className="mx-2" type="checkbox" id="featured" />
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
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                id="description"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                placeholder="Description"
                            />
                        </div>
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

                    <UploadImage image={image} uploadImage={uploadImage} removeImage={removeImage} />

                    <div className="flex justify-center">
                        <ActionButton actionName={'Add Product'} />
                    </div>
                </form>
            </div>
        </ProductLayout>
    )
}

export default Create