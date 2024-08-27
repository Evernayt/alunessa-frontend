import EditInfoModal from "./modal/EditInfoModal";
import InfoAPI from "@/api/InfoAPI/InfoAPI";
import { useAppContext } from "@/store/Context";
import EditHeader from "@/components/ui/edit-header/EditHeader";
import { ChangeEvent, useRef } from "react";
import createFileURL from "@/helpers/createFileURL";
import errorHandler from "@/helpers/errorHandler";
import FileAPI from "@/api/FileAPI/FileAPI";
import { IInfo } from "@/models/IInfo";
import styles from "./EditableInfo.module.css";

const EditableInfo = () => {
  const { info, setInfo, openModal } = useAppContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateAvatar = (file: File) => {
    if (!info) {
      errorHandler("info not found");
      return;
    }
    try {
      FileAPI.uploadAvatar(file).then((data) => {
        const updatedInfo: IInfo = { ...info, avatarImageName: data.fileName };
        const oldAvatarImageName = info.avatarImageName;

        InfoAPI.update(updatedInfo).then(() => {
          setInfo(updatedInfo);

          if (oldAvatarImageName) {
            FileAPI.deleteFile({
              folder: "avatar",
              fileNames: [oldAvatarImageName],
            });
          }
        });
      });
    } catch (e) {
      errorHandler("update avatar", e);
    }
  };

  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      updateAvatar(event.target.files[0]);
      event.target.value = "";
    }
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const openEditModal = () => {
    openModal("editInfoModal", { info });
  };

  return (
    <div>
      <EditInfoModal />
      <EditHeader title="Профиль">
        <button onClick={handleAddClick}>🙎🏻‍♂️ Изменить аватар</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={fileChangeHandler}
          accept="image/*"
        />
        <button onClick={openEditModal}>📝 Изменить описание</button>
      </EditHeader>
      <div className={styles.container}>
        <img
          className={styles.avatar}
          src={createFileURL("avatar", info?.avatarImageName)}
          alt=""
        />
        <p className={styles.description}>{info?.description}</p>
      </div>
    </div>
  );
};

export default EditableInfo;
