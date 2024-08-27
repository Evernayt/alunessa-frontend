"use client";

import DrawingModal from "./drawing-modal/DrawingModal";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useAppContext } from "@/store/Context";
import createFileURL from "@/helpers/createFileURL";
import { IDrawing } from "@/models/IDrawing";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useState } from "react";
import DrawingAPI from "@/api/DrawingAPI/DrawingAPI";
import { FETCH_MORE_LIMIT } from "@/constants/app";
import Loader, { LoaderWrapper } from "../ui/loader/Loader";
import styles from "./Drawings.module.css";

const Drawings = () => {
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const {
    drawings,
    addDrawings,
    drawingsPageCount,
    setDrawingsPageCount,
    openModal,
  } = useAppContext();

  const hasNextPage = drawingsPageCount !== 0 && page !== drawingsPageCount;

  const fetchMoreDrawings = () => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);

    DrawingAPI.getAll({ limit: FETCH_MORE_LIMIT, page: nextPage })
      .then((data) => {
        addDrawings(data.rows);
        const count = Math.ceil(data.count / FETCH_MORE_LIMIT);
        setDrawingsPageCount(count);
      })
      .catch()
      .finally(() => setIsLoadingMore(false));
  };

  const openDrawingModal = (drawing: IDrawing) => {
    openModal("drawingModal", { drawing });
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isLoadingMore,
    hasNextPage,
    onLoadMore: fetchMoreDrawings,
    rootMargin: "0px 0px 50px 0px",
  });

  return (
    <>
      <DrawingModal />
      <div className={styles.container}>
        {drawings.length > 0 && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 767: 2, 1024: 3, 1279: 4 }}
          >
            <Masonry gutter="var(--padding)">
              {drawings.map((drawing) => (
                <img
                  className={styles.image}
                  src={createFileURL("images", drawing.compressedImageName)}
                  onClick={() => openDrawingModal(drawing)}
                  key={drawing.id}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
        <div className={styles.sentry} ref={sentryRef}>
          {hasNextPage && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default Drawings;
