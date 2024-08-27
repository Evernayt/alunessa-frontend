import { createContext, useContext } from "react";
import { IContext, IModalContext } from "./Context.types";
import { IModal } from "@/models/IModal";

export const INITIAL_MODAL: IModal = { isOpen: false, isAdd: true };

const defaultModals: IModalContext = {
  editInfoModal: INITIAL_MODAL,
  editSocialNetworkModal: INITIAL_MODAL,
  editDrawingModal: INITIAL_MODAL,
  changePasswordModal: INITIAL_MODAL,
  drawingModal: INITIAL_MODAL,
};

export const defaultState: IContext = {
  ...defaultModals,
  appIsLoading: true,
  setAppIsLoading: () => {},
  openModal: () => {},
  closeModal: () => {},
  info: null,
  setInfo: () => {},
  socialNetworks: [],
  setSocialNetworks: () => {},
  addSocialNetwork: () => {},
  updateSocialNetwork: () => {},
  deleteSocialNetwork: () => {},
  clients: [],
  setClients: () => {},
  addClients: () => {},
  deleteClient: () => {},
  drawings: [],
  setDrawings: () => {},
  addDrawings: () => {},
  updateDrawing: () => {},
  deleteDrawing: () => {},
  drawingsPageCount: 0,
  setDrawingsPageCount: () => {},
};

const Context = createContext<IContext>(defaultState);
export const useAppContext = () => useContext(Context);

export default Context;
