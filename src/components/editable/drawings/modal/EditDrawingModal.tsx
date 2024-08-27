import { FormEvent, useState } from "react";
import { useAppContext } from "@/store/Context";
import FileAPI from "@/api/FileAPI/FileAPI";
import getFileImageSrc from "@/helpers/getFileImageSrc";
import { CreateDrawingsDto } from "@/api/DrawingAPI/dto/create-drawings.dto";
import DrawingAPI from "@/api/DrawingAPI/DrawingAPI";
import { IDrawing } from "@/models/IDrawing";
import errorHandler from "@/helpers/errorHandler";
import createFileURL from "@/helpers/createFileURL";
import DrawerModal from "@/components/ui/drawer-modal/DrawerModal";
import Loader, { LoaderWrapper } from "@/components/ui/loader/Loader";
import styles from "./EditDrawingModal.module.css";

const EditDrawingModal = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    editDrawingModal: { isOpen, isAdd, drawing },
    closeModal,
    addDrawings,
    updateDrawing,
  } = useAppContext();

  const create = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const file = formProps.file as File;
    const name = formProps.name as string;
    const description = formProps.description as string;

    try {
      setIsLoading(true);
      FileAPI.uploadImages([file]).then((data) => {
        if (data.images.length > 0) {
          const createdDrawing: CreateDrawingsDto = {
            name,
            description,
            compressedImageName: data.images[0].compressedFileName,
            originalImageName: data.images[0].originalFileName,
          };
          DrawingAPI.create([createdDrawing]).then((data2) => {
            addDrawings(data2);
            closeHandler();
          });
        }
      });
    } catch (e) {
      errorHandler("create drawing", e);
    } finally {
      setIsLoading(false);
    }
  };

  const update = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!drawing) {
      errorHandler("drawing not found");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const file = formProps.file as File;
    const name = formProps.name as string;
    const description = formProps.description as string;

    try {
      setIsLoading(true);
      if (file.name) {
        FileAPI.uploadImages([file]).then((data) => {
          if (data.images.length > 0) {
            const updatedDrawing: IDrawing = {
              ...drawing,
              name,
              description,
              compressedImageName: data.images[0].compressedFileName,
              originalImageName: data.images[0].originalFileName,
            };
            const oldCompressedImageName = drawing.compressedImageName;
            const oldOriginalImageName = drawing.originalImageName;
            DrawingAPI.update(updatedDrawing).then(() => {
              updateDrawing(updatedDrawing);
              closeHandler();

              FileAPI.deleteFile({
                folder: "images",
                fileNames: [oldCompressedImageName, oldOriginalImageName],
              });
            });
          }
        });
      } else {
        const updatedDrawing: IDrawing = {
          ...drawing,
          name,
          description,
        };
        DrawingAPI.update(updatedDrawing).then(() => {
          updateDrawing(updatedDrawing);
          closeHandler();
        });
      }
    } catch (e) {
      errorHandler("update drawing", e);
    } finally {
      setIsLoading(false);
    }
  };

  const closeHandler = () => {
    closeModal("editDrawingModal");
    setImageFile(null);
  };

  return (
    <DrawerModal
      isOpen={isOpen}
      onClose={closeHandler}
      title={isAdd ? "Добавить изображение" : "Редактировать изображение"}
    >
      <div className={styles.container} data-vaul-no-drag>
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <form className={styles.form} onSubmit={isAdd ? create : update}>
            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor="file">Изображение</label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(e.target.files ? e.target.files[0] : null)
                  }
                  required={isAdd}
                />
                <img
                  className={styles.image}
                  src={
                    getFileImageSrc(imageFile) ||
                    createFileURL("images", drawing?.compressedImageName)
                  }
                  alt=""
                />
              </div>
              <div className={styles.column}>
                <label htmlFor="name">Название</label>
                <input id="name" name="name" defaultValue={drawing?.name} />
                <label htmlFor="description">Описание</label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={drawing?.description}
                />
              </div>
            </div>
            <div className={styles.controls}>
              <button type="submit">Сохранить</button>
              <button type="button" onClick={closeHandler}>
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </DrawerModal>
  );
};

export default EditDrawingModal;
