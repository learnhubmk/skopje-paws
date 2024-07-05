'use client'

import React from 'react';
import Image from 'next/image';

type SlideCardProps = {
    index: number;
    name: string;
};

const SlideCard = ({ index, name }: SlideCardProps) => {
    return (
        <div
            className={`rounded-3xl border-orange border-4 flex-0 flex-shrink-0 basis-[70%] max-w-[400px] lg:max-w-[500px] xl:max-w-[500px] min-w-0 ${index > 0 ? '-ml-6' : '-ml-4'} relative`}
            style={{ zIndex: 5 + index }}
        >
            <div className="relative rounded-3xl overflow-hidden sm:h-[600px] min-h-[300px]">
                <Image
                    src={`/images/slide-${index + 1}.jpg`}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-3xl"></div>
            <div className="absolute inset-0 flex items-end justify-center mb-5">
                <div className="text-white text-4xl font-semibold">{name}</div>
            </div>
        </div>
    );
};

export default SlideCard;
