'use client'

import React from 'react';
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
    const slideNames = ['Арија', 'Реа', 'Фреја', 'Јоги', 'Дона'];
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    return (
        <section className="w-10/12 lg:w-11/12 mx-auto max-w-screen-2xl">
            <div className="flex justify-between items-center gap-3 mb-11 mt-14">
                <div className='text-black font-bold text-2xl sm:text-5xl'>Нашите среќи</div>
                <div className="grid grid-cols-2 gap-1.5 items-center">
                    <PrevButton
                        className="cursor-pointer w-8 h-8 sm:w-12 sm:h-12 z-10 text-black flex items-center justify-center"
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        className="cursor-pointer w-8 h-8 sm:w-12 sm:h-12 z-10 text-black flex items-center justify-center"
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {slideNames.map((name, index) => (
                        <SlideCard key={index} name={name} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EmblaCarousel;
