import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import { FC, ReactNode } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: ReactNode;
}

const Carousel: FC<CarouselProps> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true
  });

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles.container}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.slides}>{children}</div>
      </div>
      <PrevButton onClick={onPrevButtonClick} />
      <NextButton onClick={onNextButtonClick} />
    </div>
  );
};

export default Carousel;
