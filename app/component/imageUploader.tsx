'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ImageUploaderProps, ProjectImageUploaderProps } from '@/types';

export const ImageUploaderTwo = ({ id, title, url, image }: ImageUploaderProps) => {
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (url){
            setImagePreview(url);
        }
    }, [url]);

    const handleImageChange = async (e:any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Upload the image to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                console.log('Prev image ',image);
                
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData);
                const imageUrl = response.data.secure_url;
                image = response.data.secure_url
                console.log('Image URL:', imageUrl, 'image ', image);
                // Saving the url in my server here
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            setImagePreview('');
            setImageFile(null);
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-[15px]">
            <span className="w-full flex flex-col items-start justify-start gap-[10px]">
                <h4 className="text-md font-light">{title}</h4>
                <input 
                    type="file" 
                    name={`logo-${id}`} 
                    accept="image/*" 
                    onChange={handleImageChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button 
                    type="button" 
                    className="image-custom-button " 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select Image
                </button>
            </span>
            {imagePreview && (
                <span className="relative w-full h-[325px] rounded-[5px] overflow-hidden">
                    <Image 
                        src={imagePreview} 
                        alt="Logo" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </span>
            )}
        </div>
    );
};
const ImageUploader = ({ id, title, url, image }: ImageUploaderProps) => {
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (url){
            setImagePreview(url);
        }
    }, [url]);

    const handleImageChange = async (e:any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Upload the image to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                console.log('Prev image ',image);
                
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData);
                const imageUrl = response.data.secure_url;
                image = response.data.secure_url
                console.log('Image URL:', imageUrl, 'image ', image);
                // Saving the url in my server here
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            setImagePreview('');
            setImageFile(null);
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <h4 className="text-sm font-light">{title}</h4>
                <input 
                    type="file" 
                    name={`logo-${id}`} 
                    accept="image/*" 
                    onChange={handleImageChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button 
                    type="button" 
                    className="image-custom-button " 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select Image
                </button>
            </span>
            {imagePreview && (
                <span className="relative w-full h-[300px] rounded-[5px] overflow-hidden">
                    <Image 
                        src={imagePreview} 
                        alt="Logo" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </span>
            )}
        </div>
    );
};

export default ImageUploader;

export const FlexibleImageUploader = ({ id, title, url }: ImageUploaderProps) => {
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (url){
            setImagePreview(url);
        }
    }, [url]);

    const handleImageChange = async (e:any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Upload the image to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData); // Replace with your Cloudinary URL
                const imageUrl = response.data.secure_url;
                console.log('Image URL:', imageUrl);
                // Saving the url in my server here
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            setImagePreview('');
            setImageFile(null);
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <h4 className="text-sm font-light">{title}</h4>
                <input 
                    type="file" 
                    name={`logo-${id}`} 
                    accept="image/*" 
                    onChange={handleImageChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button 
                    type="button" 
                    className="image-custom-button" 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select Image
                </button>
            </span>
            {imagePreview && (
                <span className="relative w-full h-[87.5%] rounded-[5px] overflow-hidden">
                    <Image 
                        src={imagePreview} 
                        alt="Logo" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </span>
            )}
        </div>
    );
};


export const SignupImageUploader = ({ id, title, url, image }: ImageUploaderProps) => {
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (url){
            setImagePreview(url);
        }
    }, [url]);

    const handleImageChange = async (e:any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Upload the image to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData); // Replace with your Cloudinary URL
                const imageUrl = response.data.secure_url;
                console.log('Image URL:', imageUrl);
                // Saving the url in my server here
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            setImagePreview('');
            setImageFile(null);
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <h4 className="text-sm font-normal">{title}</h4>
                <input 
                    type="file" 
                    name={`logo-${id}`} 
                    accept="image/*" 
                    onChange={handleImageChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button 
                    type="button" 
                    className="@apply h-[45px] rounded-[3px] text-white bg-blue-600 hover:bg-blue-500 w-full" 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select Image
                </button>
            </span>
            {imagePreview && (
                <span className="relative w-full h-[87.5%] rounded-[5px] overflow-hidden mt-[13px] ">
                    <Image 
                        src={imagePreview} 
                        alt="Logo" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </span>
            )}
        </div>
    );
};

export const InstallerImageUploader = ({ id, title, url, disabled, handleUploadClick }: ProjectImageUploaderProps) => {
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (url) {
            setImagePreview(url);
        }
    }, [url]);

    const handleImageChange = async (e: any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Upload the image to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData); // Replace with your Cloudinary URL
                const imageUrl = response.data.secure_url;
                console.log('Image URL:', imageUrl);
                // Saving the url in my server here
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            setImagePreview('');
            setImageFile(null);
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <h4 className="text-sm ">{title}</h4>
                <input
                    type="file"
                    name={`logo-${id}`}
                    accept="image/*"
                    onChange={handleImageChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button
                    type="button"
                    className="image-custom-button"
                    onClick={() => {
                        if (disabled) {
                            handleUploadClick();
                        } else {
                            document.getElementById(`fileInput-${id}`)?.click();
                        }
                    }}
                >
                    Select Image
                </button>
            </span>
            {imagePreview && (
                <span className="relative w-full h-[87.5%] rounded-[5px] overflow-hidden">
                    <Image
                        src={imagePreview}
                        alt="Logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </span>
            )}
        </div>
    );
};


export const ViewImage = ({ id, title, url, image }: ImageUploaderProps) => {
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (url){
            setImagePreview(url);
        }
    }, [url]);

    const handleImageChange = async (e:any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Upload the image to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData); // Replace with your Cloudinary URL
                const imageUrl = response.data.secure_url;
                console.log('Image URL:', imageUrl);
                // Saving the url in my server here
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            setImagePreview('');
            setImageFile(null);
            alert('Please select a valid image file.');
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-start">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <input 
                    type="file" 
                    name={`logo-${id}`} 
                    accept="image/*" 
                    onChange={handleImageChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                
            </span>
            {imagePreview && (
                <span className="relative w-full h-full rounded-[5px] overflow-hidden">
                    <Image 
                        src={imagePreview} 
                        alt="Logo" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </span>
            )}
        </div>
    );
};

export const FilesUpload =  ({ id, title, url, image }: ImageUploaderProps) => {
    const [filePreview, setFilePreview] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (url) {
            setFilePreview(url);
        }
    }, [url]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const fileType = selectedFile.type;
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/upload', formData); // Replace with your Cloudinary URL
                const uploadedFileUrl = response.data.secure_url;
                console.log('Uploaded File URL:', uploadedFileUrl);
                // Save the uploaded file URL to your server here
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            setFilePreview('');
            setFile(null);
            alert('Please select a valid file.');
        }
    };

    const renderPreview = () => {
        if (!filePreview) return null;
        const fileType = file?.type;

        if (fileType?.startsWith('image/')) {
            return (
                <span className="relative w-full h-[87.5%] rounded-[5px] overflow-hidden">
                    <Image
                        src={filePreview}
                        alt="File Preview"
                        layout="fill"
                        objectFit="cover"
                    />
                </span>
            );
        } else if (fileType === 'application/pdf') {
            return (
                <iframe
                    src={filePreview}
                    title="PDF Preview"
                    className="w-full h-full"
                />
            );
        } else if (fileType === 'application/acad' || fileType === 'application/dwg') {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-gray-500">DWG File Uploaded</p>
                </div>
            );
        } else {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-gray-500">File Uploaded</p>
                </div>
            );
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <h4 className="text-sm font-light">{title}</h4>
                <input 
                    type="file" 
                    name={`file-${id}`} 
                    accept="image/*,application/pdf,application/acad,application/dwg" 
                    onChange={handleFileChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button 
                    type="button" 
                    className="image-custom-button" 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select File
                </button>
            </span>
            {filePreview && renderPreview()}
        </div>
    );
};

export const TaskFilesUpload =  ({ id, title, url, image }: ImageUploaderProps) => {
    const [filePreview, setFilePreview] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (url) {
            setFilePreview(url);
        }
    }, [url]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const fileType = selectedFile.type;
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/upload', formData); // Replace with your Cloudinary URL
                const uploadedFileUrl = response.data.secure_url;
                console.log('Uploaded File URL:', uploadedFileUrl);
                // Save the uploaded file URL to your server here
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            setFilePreview('');
            setFile(null);
            alert('Please select a valid file.');
        }
    };

    const renderPreview = () => {
        if (!filePreview) return null;
        const fileType = file?.type;

        if (fileType?.startsWith('image/')) {
            return (
                <span className="relative w-full h-[200px] rounded-[5px] overflow-hidden">
                    <Image
                        src={filePreview}
                        alt="File Preview"
                        layout="fill"
                        objectFit="cover"
                    />
                </span>
            );
        } else if (fileType === 'application/pdf') {
            return (
                <iframe
                    src={filePreview}
                    title="PDF Preview"
                    className="w-full h-[200px]"
                />
            );
        } else if (fileType === 'application/acad' || fileType === 'application/dwg') {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-gray-500">DWG File Uploaded</p>
                </div>
            );
        } else {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-gray-500">File Uploaded</p>
                </div>
            );
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <h4 className="text-sm font-light">{title}</h4>
                <input 
                    type="file" 
                    name={`file-${id}`} 
                    accept="image/*,application/pdf,application/acad,application/dwg" 
                    onChange={handleFileChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button 
                    type="button" 
                    className="w-full h-[40px] rounded-[3px] text-sm flex items-center justify-center bg-slate-700 text-white hover:bg-slate-800 " 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select File
                </button>
            </span>
            {filePreview && renderPreview()}
        </div>
    );
};

export const TaskFilesUploadTwo = ({ id, title, url, image, onFileUpload }: ImageUploaderProps) => {
    const [filePreview, setFilePreview] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (url) {
            setFilePreview(url);
        }
    }, [url]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images');

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/upload', formData);
                const uploadedFileUrl = response.data.secure_url;
                console.log('Uploaded File URL:', uploadedFileUrl);

                // Invoke the callback to send the URL back to the parent component
                if (onFileUpload) {
                    onFileUpload(uploadedFileUrl);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            setFilePreview('');
            setFile(null);
            alert('Please select a valid file.');
        }
    };

    const renderPreview = () => {
        if (!filePreview) return null; // Return null if there's no file preview
        
        const fileType = file?.type;
    
        if (fileType?.startsWith('image/')) {
            return (
                <span className="relative w-full h-[160px] rounded-[3px] overflow-hidden">
                    <Image
                        src={filePreview}
                        alt="File Preview"
                        layout="fill"
                        objectFit="cover"
                    />
                </span>
            );
        } else if (fileType === 'application/pdf') {
            return (
                <iframe
                    src={filePreview}
                    title="PDF Preview"
                    className="w-full h-[160px] rounded-[3px]"
                />
            );
        } else if (fileType === 'application/acad' || fileType === 'application/dwg') {
            return (
                <div className="w-full h-full flex justify-center items-center h-[160px] rounded-[3px] ">
                    <p className="text-gray-500">DWG File Uploaded</p>
                </div>
            );
        } else {
            return (
                <div className="w-full h-full flex justify-center items-center h-[160px] rounded-[3px] ">
                    <p className="text-gray-500">File Uploaded</p>
                </div>
            );
        }
    };
    

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            <span className="w-full flex flex-col items-start justify-start gap-2">
                <h4 className="text-sm font-light">{title}</h4>
                <input 
                    type="file" 
                    name={`file-${id}`} 
                    accept="image/*,application/pdf,application/acad,application/dwg" 
                    onChange={handleFileChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }}
                />
                <button 
                    type="button" 
                    className="w-full h-[40px] rounded-[3px] text-sm flex items-center justify-center bg-slate-700 text-white hover:bg-slate-800" 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select File
                </button>
            </span>
            {filePreview && renderPreview()}
        </div>
    );
};
