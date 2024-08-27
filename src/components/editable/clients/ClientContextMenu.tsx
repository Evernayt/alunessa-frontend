import ClientAPI from "@/api/ClientAPI/ClientAPI";
import errorHandler from "@/helpers/errorHandler";
import { IClient } from "@/models/IClient";
import { useAppContext } from "@/store/Context";
import { FC } from "react";
import { Menu, Item, ItemParams } from "react-contexify";
import "react-contexify/ReactContexify.css";

export const CLIENT_CONTEXT_MENU_ID = "CLIENT_CONTEXT_MENU_ID";

interface ClientContextMenuProps {
  setIsLoading: (isLoading: boolean) => void;
}

const ClientContextMenu: FC<ClientContextMenuProps> = ({ setIsLoading }) => {
  const { deleteClient } = useAppContext();

  const deleteHandler = (params: ItemParams<IClient>) => {
    const client = params.props;

    if (!client) {
      errorHandler("client not found");
      return;
    }

    if (confirm("Точно удаляем?")) {
      try {
        setIsLoading(true);
        ClientAPI.delete(client.id).then(() => {
          deleteClient(client.id);
        });
      } catch (e) {
        errorHandler("delete client", e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <Menu id={CLIENT_CONTEXT_MENU_ID}>
        <Item onClick={deleteHandler}>❌ Удалить</Item>
      </Menu>
    </div>
  );
};

export default ClientContextMenu;
