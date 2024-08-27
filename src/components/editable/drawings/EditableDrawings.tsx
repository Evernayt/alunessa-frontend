import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import EditHeader from "@/components/ui/edit-header/EditHeader";
import { useContextMenu } from "react-contexify";
import DrawingContextMenu, {
  DRAWING_CONTEXT_MENU_ID,
} from "./DrawingContextMenu";
import { useAppContext } from "@/store/Context";
import { IDrawing } from "@/models/IDrawing";
import { ISort } from "@/models/ISort";
import DrawingAPI from "@/api/DrawingAPI/DrawingAPI";
import EditDrawingModal from "./modal/EditDrawingModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FileAPI from "@/api/FileAPI/FileAPI";
import { CreateDrawingsDto } from "@/api/DrawingAPI/dto/create-drawings.dto";
import errorHandler from "@/helpers/errorHandler";
import createFileURL from "@/helpers/createFileURL";
import Loader, { LoaderWrapper } from "@/components/ui/loader/Loader";
import styles from "./EditableDrawings.module.css";

const EditableDrawings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    drawings,
    setDrawings,
    addDrawings,
    setDrawingsPageCount,
    openModal,
  } = useAppContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { show } = useContextMenu({
    id: DRAWING_CONTEXT_MENU_ID,
  });

  useEffect(() => {
    setIsLoading(true);
    DrawingAPI.getAll()
      .then((data) => {
        setDrawings(data.rows);
        setDrawingsPageCount(0);
      })
      .catch((e) => errorHandler("fetch drawings", e))
      .finally(() => setIsLoading(false));
  }, []);

  const createDrawings = (files: FileList) => {
    try {
      setIsLoading(true);
      FileAPI.uploadImages(files).then((data) => {
        if (data.images.length > 0) {
          const createdDrawings: CreateDrawingsDto[] = [];
          data.images.forEach((image) => {
            createdDrawings.push({
              originalImageName: image.originalFileName,
              compressedImageName: image.compressedFileName,
            });
          });
          DrawingAPI.create(createdDrawings).then((data2) => {
            addDrawings(data2);
          });
        }
      });
    } catch (e) {
      errorHandler("create drawings", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSort = () => {
    setIsLoading(true);
    const sort: ISort[] = [];
    for (let i = 0; i < drawings.length; i++) {
      sort.push({ id: drawings[i].id, orderIndex: i });
    }
    DrawingAPI.sort(sort)
      .catch((e) => errorHandler("save drawings sort", e))
      .finally(() => setIsLoading(false));
  };

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    setDrawings(arrayMoveImmutable(drawings, oldIndex, newIndex));
  };

  const handleContextMenu = (event: any, drawing: IDrawing) => {
    show({ event, props: drawing });
  };

  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      createDrawings(event.target.files);
      event.target.value = "";
    }
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const openEditModal = () => {
    openModal("editDrawingModal", { isAdd: true });
  };

  return isLoading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <div>
      <EditDrawingModal />
      <EditHeader title="Изображения">
        <button onClick={saveSort}>💾 Сохранить порядок</button>
        <button onClick={openEditModal}>➕ Добавить</button>
        <button onClick={handleAddClick}>➕ Добавить несколько</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={fileChangeHandler}
          accept="image/*"
          multiple
        />
      </EditHeader>
      <DrawingContextMenu setIsLoading={setIsLoading} />
      <SortableList
        onSortEnd={handleSortEnd}
        className={styles.list}
        draggedItemClassName={styles.dragged}
      >
        {drawings.map((drawing) => (
          <SortableItem key={drawing.id}>
            <div
              className={styles.item}
              onContextMenu={(e) => handleContextMenu(e, drawing)}
            >
              <img
                className={styles.image}
                src={createFileURL("images", drawing.compressedImageName)}
                key={drawing.id}
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  );
};

export default EditableDrawings;
