import SocialNetworkAPI from "@/api/SocialNetworkAPI/SocialNetworkAPI";
import errorHandler from "@/helpers/errorHandler";
import { ISocialNetwork } from "@/models/ISocialNetwork";
import { useAppContext } from "@/store/Context";
import { FC } from "react";
import { Menu, Item, ItemParams } from "react-contexify";
import "react-contexify/ReactContexify.css";

export const SOCIAL_NETWORK_CONTEXT_MENU_ID = "SOCIAL_NETWORK_CONTEXT_MENU_ID";

interface SocialNetworkContextMenuProps {
  setIsLoading: (isLoading: boolean) => void;
}

const SocialNetworkContextMenu: FC<SocialNetworkContextMenuProps> = ({
  setIsLoading,
}) => {
  const { openModal, deleteSocialNetwork } = useAppContext();

  const openEditModal = (params: ItemParams<ISocialNetwork>) => {
    const socialNetwork = params.props;

    openModal("editSocialNetworkModal", {
      isAdd: false,
      socialNetwork,
    });
  };

  const deleteHandler = (params: ItemParams<ISocialNetwork>) => {
    const socialNetwork = params.props;

    if (!socialNetwork) {
      errorHandler("social-network not found");
      return;
    }

    if (confirm(`Точно удаляем? (${socialNetwork.url})`)) {
      setIsLoading(true);
      SocialNetworkAPI.delete(socialNetwork.id)
        .then(() => {
          deleteSocialNetwork(socialNetwork.id);
        })
        .catch((e) => errorHandler("delete social-network", e))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div>
      <Menu id={SOCIAL_NETWORK_CONTEXT_MENU_ID}>
        <Item onClick={openEditModal}>✏️ Редактировать</Item>
        <Item onClick={deleteHandler}>❌ Удалить</Item>
      </Menu>
    </div>
  );
};

export default SocialNetworkContextMenu;
