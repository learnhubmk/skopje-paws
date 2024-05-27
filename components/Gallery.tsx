import {promises as fs} from 'fs'
import path from 'path'
import React from 'react';
import Image from 'next/image'

interface GalleryProps {
    folderName: string;
}


const Gallery = async ({folderName}: GalleryProps) => {
    const imageDirectory = path.join(process.cwd(), '/public/Galleries/', folderName);
    const imageFilenames = await fs.readdir(imageDirectory)
    return <div
        className={`flex flex-col justify-between items-center h-full overflow-hidden w-full mt-10`}> {folderName}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mt-10`}>
            {imageFilenames.map((image: string) => <Image width={150} height={150} alt={'alt'}
                                                          className={`h-auto max-w-full rounded-lg`}
                                                          src={`/Galleries/${folderName}/${image}`}
                                                          key={image}/>)}
        </div>
    </div>
}

export default Gallery;