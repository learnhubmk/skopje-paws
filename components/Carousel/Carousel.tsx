'use client'

import React from 'react';
import Image from 'next/image';
import SlideCard from './SlideCard';
import { EmblaOptionsType } from 'embla-carousel';
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButton';
import useEmblaCarousel from 'embla-carousel-react';

type PropType = {
    slides: number[];
    options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);
    console.log(slides)
    return (
        <section className="w-11/12 mx-auto max-w-screen-2xl">
            <div className="flex justify-end gap-3 mt-7">
                <div className="grid grid-cols-2 gap-1.5 items-center">
                    <PrevButton
                        className="cursor-pointer w-12 h-12 z-10 text-black flex items-center justify-center"
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        className="cursor-pointer w-12 h-12 z-10 text-black flex items-center justify-center"
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {slides.map((index) => (
                        <SlideCard key={index} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EmblaCarousel;
