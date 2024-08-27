import { FormEvent, useState } from "react";
import { useAppContext } from "@/store/Context";
import SocialNetworkAPI from "@/api/SocialNetworkAPI/SocialNetworkAPI";
import { CreateSocialNetworkDto } from "@/api/SocialNetworkAPI/dto/create-social-network.dto";
import FileAPI from "@/api/FileAPI/FileAPI";
import getFileImageSrc from "@/helpers/getFileImageSrc";
import { ISocialNetwork } from "@/models/ISocialNetwork";
import errorHandler from "@/helpers/errorHandler";
import createFileURL from "@/helpers/createFileURL";
import DrawerModal from "@/components/ui/drawer-modal/DrawerModal";
import Loader, { LoaderWrapper } from "@/components/ui/loader/Loader";
import styles from "./EditSocialNetworkModal.module.css";

const EditSocialNetworkModal = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    editSocialNetworkModal: { isOpen, isAdd, socialNetwork },
    closeModal,
    addSocialNetwork,
    updateSocialNetwork,
  } = useAppContext();

  const create = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const props = Object.fromEntries(formData);
    const file = props.file as File;
    const url = props.url as string;

    try {
      setIsLoading(true);
      FileAPI.uploadIcon(file).then((data) => {
        const createdSocialNetwork: CreateSocialNetworkDto = {
          iconImageName: data.fileName,
          url,
        };
        SocialNetworkAPI.create(createdSocialNetwork).then((data2) => {
          addSocialNetwork(data2);
          closeHandler();
        });
      });
    } catch (e) {
      errorHandler("create social-network", e);
    } finally {
      setIsLoading(false);
    }
  };

  const update = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!socialNetwork) {
      errorHandler("social-network not found");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const file = formProps.file as File;
    const url = formProps.url as string;

    try {
      setIsLoading(true);
      if (file.name) {
        FileAPI.uploadIcon(file).then((data) => {
          const updatedSocialNetwork: ISocialNetwork = {
            ...socialNetwork,
            iconImageName: data.fileName,
            url,
          };
          const oldIconImageName = socialNetwork.iconImageName;
          SocialNetworkAPI.update(updatedSocialNetwork).then(() => {
            updateSocialNetwork(updatedSocialNetwork);
            closeHandler();

            FileAPI.deleteFile({
              folder: "icons",
              fileNames: [oldIconImageName],
            });
          });
        });
      } else {
        const updatedSocialNetwork: ISocialNetwork = {
          ...socialNetwork,
          url,
        };
        SocialNetworkAPI.update(updatedSocialNetwork).then(() => {
          updateSocialNetwork(updatedSocialNetwork);
          closeHandler();
        });
      }
    } catch (e) {
      errorHandler("update social-network", e);
    } finally {
      setIsLoading(false);
    }
  };

  const closeHandler = () => {
    closeModal("editSocialNetworkModal");
    setImageFile(null);
  };

  return (
    <DrawerModal
      isOpen={isOpen}
      onClose={closeHandler}
      title={isAdd ? "Добавить соц.сеть" : "Редактировать соц.сеть"}
    >
      <div className={styles.container} data-vaul-no-drag>
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <form className={styles.form} onSubmit={isAdd ? create : update}>
            <div className={styles.image}>
              <img
                src={
                  getFileImageSrc(imageFile) ||
                  createFileURL("icons", socialNetwork?.iconImageName)
                }
                width={24}
                height={24}
                alt=""
              />
            </div>
            <label htmlFor="file">Иконка</label>
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
            <label htmlFor="url">Ссылка</label>
            <input
              id="url"
              name="url"
              type="url"
              defaultValue={socialNetwork?.url}
              required
            />
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

export default EditSocialNetworkModal;
