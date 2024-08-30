import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import EditHeader from "@/components/ui/edit-header/EditHeader";
import SocialNetworkContextMenu, {
  SOCIAL_NETWORK_CONTEXT_MENU_ID,
} from "./SocialNetworkContextMenu";
import { useContextMenu } from "react-contexify";
import { useAppContext } from "@/store/Context";
import EditSocialNetworkModal from "./modal/EditSocialNetworkModal";
import { ISocialNetwork } from "@/models/ISocialNetwork";
import { ISort } from "@/models/ISort";
import SocialNetworkAPI from "@/api/SocialNetworkAPI/SocialNetworkAPI";
import createFileURL from "@/helpers/createFileURL";
import errorHandler from "@/helpers/errorHandler";
import { useState } from "react";
import Loader, { LoaderWrapper } from "@/components/ui/loader/Loader";
import styles from "./EditableSocialNetworks.module.css";

const EditableSocialNetworks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { socialNetworks, setSocialNetworks, openModal } = useAppContext();

  const { show } = useContextMenu({
    id: SOCIAL_NETWORK_CONTEXT_MENU_ID,
  });

  const saveSort = () => {
    setIsLoading(true);
    const sort: ISort[] = [];
    for (let i = 0; i < socialNetworks.length; i++) {
      sort.push({ id: socialNetworks[i].id, orderIndex: i });
    }
    SocialNetworkAPI.sort(sort)
      .catch((e) => errorHandler("save social-networks sort", e))
      .finally(() => setIsLoading(false));
  };

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    setSocialNetworks(arrayMoveImmutable(socialNetworks, oldIndex, newIndex));
  };

  const handleContextMenu = (event: any, socialNetwork: ISocialNetwork) => {
    show({ event, props: socialNetwork });
  };

  const openEditModal = () => {
    openModal("editSocialNetworkModal", { isAdd: true });
  };

  return isLoading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <div>
      <EditSocialNetworkModal />
      <EditHeader title="Соц.сети">
        <button onClick={saveSort}>💾 Сохранить порядок</button>
        <button onClick={openEditModal}>➕ Добавить</button>
      </EditHeader>
      <SocialNetworkContextMenu setIsLoading={setIsLoading} />
      <SortableList
        onSortEnd={handleSortEnd}
        className={styles.list}
        draggedItemClassName={styles.dragged}
      >
        {socialNetworks.map((socialNetwork) => (
          <SortableItem key={socialNetwork.id}>
            <div
              className={styles.item}
              onContextMenu={(e) => handleContextMenu(e, socialNetwork)}
            >
              <img
                src={createFileURL("icons", socialNetwork.icon)}
                width={24}
                height={24}
                alt=""
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  );
};

export default EditableSocialNetworks;
