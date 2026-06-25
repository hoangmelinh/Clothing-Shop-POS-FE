import { useState, useRef } from 'react';

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        // Giả lập upload ảnh (thực tế gọi API upload)
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        onChange([...images, ...newImages]);
    };

    const removeImage = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-surface-container rounded-lg p-4 border border-outline/10">
            <h3 className="font-title-sm text-title-sm text-on-background mb-4">
                Thư viện ảnh ({images.length})
            </h3>

            <div
                className="border-2 border-dashed border-outline-variant/50 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low/50 transition-colors min-h-[120px]"
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <span className="material-symbols-outlined text-outline-variant text-3xl">cloud_upload</span>
                <p className="font-button text-button text-primary mt-1">Nhấn để tải lên</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    hoặc kéo thả ảnh vào đây
                </p>
            </div>

            {/* Grid ảnh */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                            <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-0.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}