'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ImageUploaderProps, ProjectImageUploaderProps } from '@/types';

const ImageUploader = ({ id, title, url }: ImageUploaderProps) => {
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
        <div className="w-full flex flex-col justify-start items-start gap-2">
            <span className="w-full flex flex-col items-start justify-start gap-2">
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
                    className="image-custom-button" 
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