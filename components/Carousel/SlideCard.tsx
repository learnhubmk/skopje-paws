import React from 'react';
import Image from 'next/image';

type SlideCardProps = {
    index: number;
    name: string;
    imageUrl: string;
};

const SlideCard = ({ index, name, imageUrl }: SlideCardProps) => {
    return (
        <div
            className={`rounded-3xl flex-0 flex-shrink-0 basis-[70%] max-w-sm lg:max-w-lg min-w-0 ${index > 0 ? '-ml-6' : '-ml-4'} relative`}
            style={{ zIndex: 5 + index }}
        >
            <div className="relative border-orange border-4 rounded-3xl overflow-hidden h-80 sm:h-CarouselCardHeight">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill={true}
                    className="object-cover"
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
