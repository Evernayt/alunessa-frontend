import React, { ButtonHTMLAttributes, FC, useCallback } from "react";
import { EmblaCarouselType } from "embla-carousel";
import styles from "./Carousel.module.css";

type UsePrevNextButtonsType = {
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return {
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      className={[styles.slider_button, styles.prev].join(" ")}
      {...props}
    >
      <img src="/chevron-left.svg" />
    </button>
  );
};

export const NextButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      className={[styles.slider_button, styles.next].join(" ")}
      {...props}
    >
      <img src="/chevron-right.svg" />
    </button>
  );
};
