"use client";

import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { ImagePlus, Trash } from 'lucide-react';

import { css } from 'styled-system/css';
import { center, hstack } from 'styled-system/patterns';

interface UploadImageProps {
    values: string[];
    onChange: (value: string) => void;
    onCancel: (value: string) => void;
};

const UploadImage: React.FC<UploadImageProps> = ({
    values,
    onChange,
    onCancel
}) => {
    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    return (
        <CldUploadWidget
            onUpload={onUpload}
            uploadPreset='ml_default'>
            {({ open }) => {
                function handleOnClick(e: React.MouseEvent<HTMLElement>) {
                    e.preventDefault();
                    open();
                }
                return (
                    <div>
                        <div className={hstack({
                            my: 2
                        })}>
                            {
                                values.map((imageUrl) => (
                                    <div key={imageUrl} className={css({
                                        w: "200px",
                                        h: "200px",
                                        pos: "relative"
                                    })}>
                                        <Image
                                            src={imageUrl}
                                            alt=""
                                            fill
                                        />
                                        <button
                                            onClick={() => onCancel(imageUrl)}
                                            className={center({
                                                w: 10,
                                                h: 10,
                                                bg: "red",
                                                rounded: "md",
                                                color: "white",
                                                _hover: {
                                                    cursor: "pointer"
                                                },
                                                pos: "absolute",
                                                top: 2,
                                                right: 2
                                            })}>
                                            <Trash size={16} />
                                        </button>

                                    </div>

                                ))
                            }
                        </div>
                        <button className={hstack({
                                bg: "slate.100",
                                my: 4,
                                px: 4,
                                py: 2,
                                rounded: "md",
                                fontWeight: "medium",
                                fontSize: "sm",
                                _hover: {
                                    cursor: "pointer"
                                }
                            })} onClick={handleOnClick}>
                                <ImagePlus size={16} />
                                Upload an Image
                            </button>
                    </div>
                );
            }}
        </CldUploadWidget>
    );
};

export default UploadImage;
