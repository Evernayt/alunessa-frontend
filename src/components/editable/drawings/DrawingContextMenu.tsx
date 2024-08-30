import DrawingAPI from "@/api/DrawingAPI/DrawingAPI";
import errorHandler from "@/helpers/errorHandler";
import { IDrawing } from "@/models/IDrawing";
import { useAppContext } from "@/store/Context";
import { FC } from "react";
import { Menu, Item, ItemParams } from "react-contexify";
import "react-contexify/ReactContexify.css";

export const DRAWING_CONTEXT_MENU_ID = "DRAWING_CONTEXT_MENU_ID";

interface DrawingContextMenuProps {
  setIsLoading: (isLoading: boolean) => void;
}

const DrawingContextMenu: FC<DrawingContextMenuProps> = ({ setIsLoading }) => {
  const { openModal, deleteDrawing } = useAppContext();

  const openEditModal = (params: ItemParams<IDrawing>) => {
    const drawing = params.props;

    openModal("editDrawingModal", {
      isAdd: false,
      drawing,
    });
  };

  const deleteHandler = (params: ItemParams<IDrawing>) => {
    const drawing = params.props;

    if (!drawing) {
      errorHandler("drawing not found");
      return;
    }

    if (confirm("Точно удаляем?")) {
      setIsLoading(true);
      DrawingAPI.delete(drawing.id)
        .then(() => deleteDrawing(drawing.id))
        .catch((e) => errorHandler("delete drawing", e))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div>
      <Menu id={DRAWING_CONTEXT_MENU_ID}>
        <Item onClick={openEditModal}>✏️ Редактировать</Item>
        <Item onClick={deleteHandler}>❌ Удалить</Item>
      </Menu>
    </div>
  );
};

export default DrawingContextMenu;
