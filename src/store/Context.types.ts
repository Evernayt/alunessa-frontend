import { IClient } from "@/models/IClient";
import { IDrawing } from "@/models/IDrawing";
import { IInfo } from "@/models/IInfo";
import {
  IEditDrawingModal,
  IEditInfoModal,
  IEditSocialNetworkModal,
  IDrawingModal,
  IModal,
} from "@/models/IModal";
import { ISocialNetwork } from "@/models/ISocialNetwork";

export interface IModalContext {
  editInfoModal: IEditInfoModal;
  editSocialNetworkModal: IEditSocialNetworkModal;
  editDrawingModal: IEditDrawingModal;
  changePasswordModal: IModal;
  drawingModal: IDrawingModal;
}

export interface IContext extends IModalContext {
  openModal: (
    modal: keyof IModalContext,
    props?: Partial<IModalContext[keyof IModalContext]>
  ) => void;
  appIsLoading: boolean;
  setAppIsLoading: (appIsLoading: boolean) => void;
  closeModal: (modal: keyof IModalContext) => void;
  info: IInfo | null;
  setInfo: (info: IInfo) => void;
  socialNetworks: ISocialNetwork[];
  setSocialNetworks: (socialNetworks: ISocialNetwork[]) => void;
  addSocialNetwork: (socialNetwork: ISocialNetwork) => void;
  updateSocialNetwork: (socialNetwork: ISocialNetwork) => void;
  deleteSocialNetwork: (id: number) => void;
  clients: IClient[];
  setClients: (clients: IClient[]) => void;
  addClients: (clients: IClient[]) => void;
  deleteClient: (id: number) => void;
  drawings: IDrawing[];
  setDrawings: (drawings: IDrawing[]) => void;
  addDrawings: (drawings: IDrawing[]) => void;
  updateDrawing: (drawing: IDrawing) => void;
  deleteDrawing: (id: number) => void;
  drawingsPageCount: number;
  setDrawingsPageCount: (cout: number) => void;
}
