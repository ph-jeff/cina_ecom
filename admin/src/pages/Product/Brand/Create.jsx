import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ActionButton from '../../../components/ActionButton';
import api from '../../../services/apiRequest';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Create = ({ open, setOpen, handleClose, brandName, setBrandName, setLoading }) => {
    const [fileUpload, setFileUpload] = useState(null);
    const [image, setImage] = useState(null);

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

    function removeImage() {
        setImage(null);
    }

    function addBrand(e) {
        e.preventDefault()
        setOpen(false)
        setLoading(true)

        if (!fileUpload) {
            alert('No image is selected');
            return;
        }

        if (brandName == "") {
            alert('Brand Name should not be empty');
            return;
        }

        const data = new FormData();
        data.append('image', fileUpload);
        data.append('brand_name', brandName);

        api.post('/api/admin/brand', data)
            .then(response => {
                console.log(response)
                setBrandName("")
                setImage(null)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Brand
                </Typography>
                <form onSubmit={addBrand} encType="multipart/form-data" >
                    <div>
                        {!image ? (
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Upload Image
                                <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            aria-hidden="true"
                                            className="w-12 h-12 mx-auto text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="text-sm text-gray-600">Click to upload</p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                        id="image"
                                        onChange={uploadImage}
                                        type="file"
                                        className="hidden"
                                        accept=".svg, .png, .jpg, .jpeg, .gif"
                                    />
                                </div>
                            </label>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image Preview</label>
                                <div className="relative w-24 h-24 bg-red-900 rounded-full">
                                    <img className="h-full w-full object-cover" src={image} alt="Product" />
                                    <button onClick={removeImage} className="absolute top-0 right-0 rounded-full bg-red-900 text-white p-1">X</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='mt-2'>
                        <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder='Brand Name' />
                    </div>
                    <div className='mt-3 flex justify-center w-full'>
                        <ActionButton actionName={'Save'} />
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default Create