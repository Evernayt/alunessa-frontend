import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import EditHeader from "@/components/ui/edit-header/EditHeader";
import { useContextMenu } from "react-contexify";
import ClientContextMenu, { CLIENT_CONTEXT_MENU_ID } from "./ClientContextMenu";
import { useAppContext } from "@/store/Context";
import { ISort } from "@/models/ISort";
import { IClient } from "@/models/IClient";
import { ChangeEvent, useRef, useState } from "react";
import FileAPI from "@/api/FileAPI/FileAPI";
import { CreateClientsDto } from "@/api/ClientAPI/dto/create-clients.dto";
import ClientAPI from "@/api/ClientAPI/ClientAPI";
import errorHandler from "@/helpers/errorHandler";
import createFileURL from "@/helpers/createFileURL";
import Loader, { LoaderWrapper } from "@/components/ui/loader/Loader";
import styles from "./EditableClients.module.css";

const EditableClients = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { clients, setClients, addClients } = useAppContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { show } = useContextMenu({
    id: CLIENT_CONTEXT_MENU_ID,
  });

  const createClients = (files: FileList) => {
    try {
      setIsLoading(true);
      FileAPI.uploadImages(files).then((data) => {
        if (data.images.length > 0) {
          const createdClients: CreateClientsDto[] = [];
          data.images.forEach((image) => {
            createdClients.push({
              originalImageName: image.originalFileName,
              compressedImageName: image.compressedFileName,
            });
          });

          ClientAPI.create(createdClients).then((data2) => {
            addClients(data2);
          });
        }
      });
    } catch (e) {
      errorHandler("create clients", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSort = () => {
    setIsLoading(true);
    const sort: ISort[] = [];
    for (let i = 0; i < clients.length; i++) {
      sort.push({ id: clients[i].id, orderIndex: i });
    }
    ClientAPI.sort(sort)
      .catch((e) => errorHandler("save clients sort", e))
      .finally(() => setIsLoading(false));
  };

  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      createClients(event.target.files);
      event.target.value = "";
    }
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    setClients(arrayMoveImmutable(clients, oldIndex, newIndex));
  };

  const handleContextMenu = (event: any, client: IClient) => {
    show({ event, props: client });
  };

  return isLoading ? (
    <LoaderWrapper className={styles.loader}>
      <Loader />
    </LoaderWrapper>
  ) : (
    <div>
      <EditHeader title="Заказчики">
        <button onClick={saveSort}>💾 Сохранить порядок</button>
        <button onClick={handleAddClick}>➕ Добавить несколько</button>
      </EditHeader>
      <ClientContextMenu setIsLoading={setIsLoading} />
      <SortableList
        onSortEnd={handleSortEnd}
        className={styles.list}
        draggedItemClassName={styles.dragged}
      >
        {clients.map((client) => (
          <SortableItem key={client.id}>
            <div
              className={styles.item}
              onContextMenu={(e) => handleContextMenu(e, client)}
            >
              <img
                className={styles.image}
                src={createFileURL("images", client.compressedImageName)}
                alt=""
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={fileChangeHandler}
        accept="image/*"
      />
    </div>
  );
};

export default EditableClients;
