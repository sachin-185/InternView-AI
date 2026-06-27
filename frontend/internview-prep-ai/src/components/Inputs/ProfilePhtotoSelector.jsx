import React, { useState } from "react";
import { FaCamera, FaUser } from 'react-icons/fa';

const ProfilePhotoSelector = ({ image, onImageChange }) => {
    const [preview, setPreview] = useState(image || null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const processFile = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            if (onImageChange) {
                onImageChange(file); // Passed the file object instead of the base64 string
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setPreview(null);
        if (onImageChange) {
            onImageChange(null);
        }
    };

    return (
        <div className="mb-4">
            <div className="flex flex-col items-center">
                <div className="relative mb-3">
                    {preview ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                            <img
                                src={preview}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white shadow-md">
                            <FaUser className="w-6 h-6 text-gray-400" />
                        </div>
                    )}
                    {preview && (
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                        >
                            ×
                        </button>
                    )}
                </div>
                <div
                    className={`w-full p-2 border border-dashed rounded text-center text-xs transition-colors ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="profile-photo-upload"
                    />
                    <label
                        htmlFor="profile-photo-upload"
                        className="cursor-pointer flex items-center justify-center gap-1 text-gray-500"
                    >
                        <FaCamera className="w-3 h-3" />
                        <span>Upload photo</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhotoSelector;
