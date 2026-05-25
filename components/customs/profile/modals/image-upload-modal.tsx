"use client";

import React, { useState, useRef, useCallback } from "react";
import {
    Modal,
    Button,
    Slider,
    toast
} from "@heroui/react";
import Cropper, { Area } from "react-easy-crop";
import { ImagePlus, ImageIcon } from "lucide-react";
import { api } from "@/lib/axios";
import { useUploadThing } from "@/lib/uploadthing";

interface ImageUploadModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onUploadSuccess?: (url: string) => void; 
}

export default function ImageUploadModal({ isOpen, onOpenChange, onUploadSuccess }: ImageUploadModalProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { startUpload } = useUploadThing('imageUploader');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageSrc(reader.result as string);
            });
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleReset = () => {
        setImageSrc(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCloseModal = () => {
        onOpenChange(false);
        setTimeout(() => handleReset(), 300);
    };

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

    const getCroppedFile = async (
        imageSrc: string,
        pixelCrop: Area
    ): Promise<File> => {
        // Menggunakan fungsi createImage yang sudah dibuat
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Canvas error");
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Crop gagal"));
                    return;
                }
                const file = new File([blob], "profile-image.jpg", {
                    type: "image/jpeg",
                });
                resolve(file);
            }, "image/jpeg");
        });
    };

    const handleSubmit = async () => {
        if (!imageSrc || !croppedAreaPixels) {
            toast.warning("Pilih gambar terlebih dahulu!");
            return;
        }

        setIsSubmitting(true);

        const processUpload = async () => {
            const croppedFile = await getCroppedFile(imageSrc, croppedAreaPixels);
            
            const uploadResult = await startUpload([croppedFile]);

            if (!uploadResult || uploadResult.length === 0) {
                throw new Error("Gagal mengunggah gambar ke server");
            }

            const imageUrl = uploadResult[0].ufsUrl;

            await api.patch("/users/me", {
                image: imageUrl,
            });

            if (onUploadSuccess) {
                onUploadSuccess(imageUrl);
            }

            return "Foto profil berhasil diperbarui!";
        };

        const uploadTask = processUpload()
            .then((successMsg) => {
                handleCloseModal();
                return successMsg;
            })
            .finally(() => {
                setIsSubmitting(false);
            });

        toast.promise(uploadTask, {
            loading: "Memproses dan mengunggah gambar...",
            success: (msg) => `${msg}`,
            error: (err: unknown) => {
                if (err instanceof Error) return err.message;
                return "Terjadi kesalahan saat mengunggah gambar";
            },
        });
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md">

                        <Modal.CloseTrigger onClick={handleCloseModal} className="text-primary/70" />

                        <Modal.Header>
                            <Modal.Heading className="text-xl font-bold">
                                {imageSrc ? "Edit Gambar" : "Pilih Gambar"}
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            {!imageSrc ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <div className="p-4 bg-gray-100 rounded-xl mb-3 text-gray-400">
                                        <ImagePlus size={32} />
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium text-center">
                                        Drop your image here,<br />
                                        or <span className="text-teal-600 hover:underline">browse</span>
                                    </p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={onFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-black/5">
                                        <Cropper
                                            image={imageSrc}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
                                            cropShape="round"
                                            showGrid={false}
                                            onCropChange={setCrop}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={setZoom}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 px-2 w-full">
                                        <ImageIcon size={18} className="text-gray-500 shrink-0" />
                                        <Slider
                                            aria-label="Zoom"
                                            step={0.1}
                                            minValue={1}
                                            maxValue={3}
                                            value={zoom}
                                            onChange={(value) => setZoom(value as number)}
                                            className="flex-1"
                                        >
                                            <Slider.Track className="bg-gray-200 h-2 rounded-full">
                                                <Slider.Fill className="bg-gray-600 rounded-full" />
                                                <Slider.Thumb className="bg-gray-600 w-5 h-5 rounded-full shadow-md cursor-grab active:cursor-grabbing" />
                                            </Slider.Track>
                                        </Slider>
                                        <ImageIcon size={24} className="text-gray-500 shrink-0" />
                                    </div>
                                </div>
                            )}
                        </Modal.Body>

                        {imageSrc && (
                            <Modal.Footer className="flex justify-between w-full">
                                <Button
                                    onPress={handleReset}
                                    isDisabled={isSubmitting}
                                    className="border-gray-200 font-medium"
                                >
                                    Ulang
                                </Button>
                                <div className="flex gap-2">
                                    <Button
                                        className="bg-teal-50 text-teal-700 font-medium"
                                        onPress={handleCloseModal}
                                        isDisabled={isSubmitting}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        className="bg-teal-600 text-white font-medium shadow-md shadow-teal-500/20"
                                        onPress={handleSubmit}
                                        isDisabled={isSubmitting}
                                    >
                                        Simpan
                                    </Button>
                                </div>
                            </Modal.Footer>
                        )}

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}