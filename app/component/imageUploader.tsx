'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FileUploaderProps, ImageUploaderProps, ProjectImageUploaderProps } from '@/types';
import { RiFileDownloadFill } from "react-icons/ri";


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


export const FileUploader = ({ id, title, url, onFileUpload, type }: FileUploaderProps) => {
    const [filePreview, setFilePreview] = useState('');
    const [isImage, setIsImage] = useState(false);
    
        useEffect(() => {
        if (url) {
            // Determine if the passed URL is an image
            const fileType = url.split('.').pop()?.toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(fileType || '')) {
            setIsImage(true);
            } else {
            setIsImage(false);
            }
            setFilePreview(url);
        }
        }, [url]);
    
        const handleFileChange = async (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
    
            if (fileType.startsWith('image/')) {
            setIsImage(true);
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);
            } else if (fileType === 'application/pdf') {
            setIsImage(false);
            setFilePreview(URL.createObjectURL(selectedFile));
            } else {
            setIsImage(false);
            setFilePreview('');
            alert('Unsupported file type. Please select an image or PDF.');
            return;
            }
    
            // Upload the file to Cloudinary
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset
    
            try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData);
            const fileUrl = response.data.secure_url;
    
            // Invoke the callback to send the URL back to the parent component
            if (onFileUpload) {
                const nam = type || ''
                onFileUpload(fileUrl, nam);
            }
            } catch (error) {
            console.error('Error uploading file:', error);
            }
        } else {
            setFilePreview('');
        }
        };
    
        return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            <span className="w-full flex flex-col items-start justify-start gap-[10px]">
                <h4 className="text-[15px] ">{title}</h4>
                <input 
                    type="file" 
                    name={`file-${id}`} 
                    accept="image/*,application/pdf" // Accept both images and PDFs
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
    
            {filePreview && (
            isImage ? (
                <span className="relative w-full flex jusitify-center h-[375px] rounded-[5px] overflow-hidden">
                <Image 
                    src={filePreview} 
                    alt="Image Preview" 
                    layout="fill" 
                    objectFit="cover" 
                />
                </span>
            ) : (
                <span className="w-full mx-auto flex flex-col items-center justify-start gap-[10px]">
                    <embed
                        src={filePreview}
                        type="application/pdf"
                        width="100%"
                        height="365px"
                    />
                    <a href={filePreview} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-[10px] w-full hover:text-blue-600 cursor-pointer hover:underline text-[15px] ">
                        <RiFileDownloadFill size={19} /> Download File
                    </a>
                </span>
            )
            )}
        </div>
        );
};

export const FileViewer = ({ id, title, url, onFileUpload }: FileUploaderProps) => {
    const [filePreview, setFilePreview] = useState('');
    const [isImage, setIsImage] = useState(false);
    
        useEffect(() => {
        if (url) {
            // Determine if the passed URL is an image
            const fileType = url.split('.').pop()?.toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(fileType || '')) {
            setIsImage(true);
            } else {
            setIsImage(false);
            }
            setFilePreview(url);
        }
        }, [url]);
    
        const handleFileChange = async (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
    
            if (fileType.startsWith('image/')) {
            setIsImage(true);
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);
            } else if (fileType === 'application/pdf') {
            setIsImage(false);
            setFilePreview(URL.createObjectURL(selectedFile));
            } else {
            setIsImage(false);
            setFilePreview('');
            alert('Unsupported file type. Please select an image or PDF.');
            return;
            }
    
            // Upload the file to Cloudinary
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset
    
            try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData);
            const fileUrl = response.data.secure_url;
    
            // Invoke the callback to send the URL back to the parent component
            if (onFileUpload) {
                onFileUpload(fileUrl, "type");
            }
            } catch (error) {
            console.error('Error uploading file:', error);
            }
        } else {
            setFilePreview('');
        }
        };
    
        return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            
            {filePreview && (
            isImage ? (
                <span className="relative w-full h-[340px] rounded-[5px] overflow-hidden">
                <Image 
                    src={filePreview} 
                    alt="Image Preview" 
                    layout="fill" 
                    objectFit="cover" 
                />
                </span>
            ) : (
                <span className="w-full h-full flex flex-col items-center justify-start gap-[10px]">

                    <embed
                        src={filePreview}
                        type="application/pdf"
                        width="100%"
                        height="300px"
                    />

                    <a href={filePreview} target="_blank" rel="noopener noreferrer" className=" hover:text-blue-600 cursor-pointer hover:underline flex items-center justify-start gap-[10px] w-full text-[15px] ">
                        <RiFileDownloadFill size={19} /> Download File
                    </a>
                </span>
            )
            )}
        </div>
        );
};




const ImageUploader = ({ id, title, url, image, onFileUpload }: ImageUploaderProps) => {
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
                
                // Invoke the callback to send the URL back to the parent component
                if (onFileUpload) {
                    onFileUpload(imageUrl);
                }
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
            <span className="w-full flex flex-col items-start justify-start gap-[10px]">
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
                <span className="relative w-full h-[340px] rounded-[5px] overflow-hidden">
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

export default ImageUploader

export const CompanyImageUploader = ({ id, title, url, image, onFileUpload }: ImageUploaderProps) => {
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
                
                // Invoke the callback to send the URL back to the parent component
                if (onFileUpload) {
                    onFileUpload(imageUrl);
                }
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
            <span className="w-full flex flex-col items-start justify-start gap-[10px]">
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
                    className="h-[45px] rounded-[5px] text-white bg-blue-600 w-full text-sm" 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select Image
                </button>
            </span>
            {imagePreview && (
                <span className="relative w-full h-[430px] rounded-[5px] overflow-hidden">
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