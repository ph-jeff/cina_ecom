import React from 'react'

const UploadImage = ({image, uploadImage, removeImage}) => {
  return (
    <>
        <div className="mb-4">
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
            <div className="relative w-24 h-24 bg-red-900 rounded-full">
            <img className="h-full w-full object-cover" src={image} alt="Product" />
            <button onClick={removeImage} className="absolute top-0 right-0 rounded-full bg-red-900 text-white p-1">X</button>
            </div>
        )}
        </div>
    </>
  )
}

export default UploadImage