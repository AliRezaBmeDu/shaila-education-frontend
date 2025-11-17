'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import CourseCard, { Course } from './CourseCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CourseCarouselProps {
  courses: Course[];
}

export default function CourseCarousel({ courses }: CourseCarouselProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-400">No courses available yet. Check back soon!</p>
      </div>
    );
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    // --- 1. LOOP IS NOW TRUE ---
    { 
      loop: true, 
      align: 'center', 
    },
    [
      Autoplay({ 
        delay: 3000, 
        stopOnInteraction: true, // This stops the "snap back" bug
        stopOnMouseEnter: true 
      })
    ]
  );

  const [tweakValues, setTweakValues] = useState<number[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  
  // --- 2. THIS IS THE CORRECT LOGIC FOR A LOOPING CAROUSEL ---
  const applyCarouselTweaks = useCallback(() => {
    if (!emblaApi) return;

    const scrollProgress = emblaApi.scrollProgress();
    const scrollSnaps = emblaApi.scrollSnapList();

    const styles: number[] = scrollSnaps.map((scrollSnap, index) => {
      // Calculate difference from current scroll progress
      let diff = scrollSnap - scrollProgress;

      // This is the magic: it handles the "jump" when the loop resets
      if (diff > 0.5) diff -= 1;
      if (diff < -0.5) diff += 1;

      return diff * 100; // Returns a value like -16.6, 0, 16.6
    });
    
    setTweakValues(styles);
    setActiveSlideIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setTweakValues]);
  // -----------------------------------------------------------

  useEffect(() => {
    if (!emblaApi) return;
    
    applyCarouselTweaks();
    emblaApi.on('scroll', applyCarouselTweaks);
    emblaApi.on('reInit', applyCarouselTweaks);
    emblaApi.on('select', (api) => {
      setActiveSlideIndex(api.selectedScrollSnap());
      applyCarouselTweaks();
    });
  }, [emblaApi, applyCarouselTweaks]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    emblaApi?.plugins().autoplay.reset(); // Reset autoplay timer on click
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    emblaApi?.plugins().autoplay.reset(); // Reset autoplay timer on click
  }, [emblaApi]);

  return (
    <div 
      className="relative overflow-hidden py-12"
      // onMouseEnter/Leave is handled by the Autoplay plugin
    >
      {/* Carousel Viewport */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex -ml-8">
          {courses.map((course, index) => {
            
            const tweakFactor = tweakValues[index] || 0;
            const distance = Math.abs(tweakFactor);

            const scale = 1 - (distance * 0.015);
            const opacity = 1 - (distance * 0.03);

            return (
              <div
                key={course._id}
                className="embla__slide relative flex-none w-[70%] md:w-[45%] lg:w-[30%] pl-8"
                style={{
                  transform: `scale(${Math.max(0.7, scale)})`,
                  opacity: Math.max(0.3, opacity),
                  zIndex: courses.length - distance,
                  transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                }}
              >
                <CourseCard course={course} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 z-10">
        
        {/* 3. REMOVED 'disabled' ATTRIBUTE */}
        <button
          onClick={scrollPrev}
          className="p-3 bg-black/40 rounded-full text-white hover:bg-black/60 transition-all focus:outline-none"
          aria-label="Previous Course"
        >
          <ChevronLeft size={32} />
        </button>
        
        {/* 4. REMOVED 'disabled' ATTRIBUTE */}
        <button
          onClick={scrollNext}
          className="p-3 bg-black/40 rounded-full text-white hover:bg-black/60 transition-all focus:outline-none"
          aria-label="Next Course"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}