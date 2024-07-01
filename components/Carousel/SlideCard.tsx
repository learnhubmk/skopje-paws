'use client'

import React from 'react';
import Image from 'next/image';

type SlideCardProps = {
    index: number;
};

const SlideCard = ({ index }: SlideCardProps) => {
    return (
        <div
            className={`flex-0 flex-shrink-0 basis-[70%] max-w-[400px] lg:max-w-[500px] xl:max-w-[500px] min-w-0 ${index > 0 ? '-ml-6' : 'pl-2'} relative`}
            style={{ zIndex: 5 + index }}
        >
            <div className="relative rounded-3xl overflow-hidden h-[600px] border-4 border-orange">
                <Image
                    src={`/images/slide-${index + 1}.jpg`} // Ensure your path is correct
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            {/* Optional: You can overlay content on top of the image if needed */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-4xl font-semibold">Slide {index + 1}</div>
            </div>
        </div>
    );
};

export default SlideCard;
