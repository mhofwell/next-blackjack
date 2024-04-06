'use client';
import React, { useState, useEffect } from 'react';

type ImageData = {
    url: string;
    title: string;
};

type ImageSelectorProps = {
    images: ImageData[];
};

const images = [
    {
        url: 'https://resources.premierleague.com/premierleague/badges/50/t3@x2.png',
        title: 'Arsenal',
    },
    {
        url: 'https://resources.premierleague.com/premierleague/badges/50/t7@x2.png',
        title: 'Aston Villa',
    },
    {
        url: 'https://resources.premierleague.com/premierleague/badges/50/t14@x2.png',
        title: 'Liverpool',
    },
    {
        url: 'https://resources.premierleague.com/premierleague/badges/50/t43@x2.png',
        title: 'Manchester City',
    },
];

// const ImageSelector: React.FC<ImageSelectorProps> = ({ images }) => {
// const ImageSelector: React.FC<ImageSelectorProps> = () => {
const ImageSelector = () => {
    const [selectedImage, setSelectedImage] = useState<ImageData>(images[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomImage =
                images[Math.floor(Math.random() * images.length)];
            setSelectedImage(randomImage);
        }, 100);

        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, 5000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [images]);

    return (
        <div>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <h2 className="text-white">{selectedImage.title}</h2>
        </div>
    );
};

export default ImageSelector;
