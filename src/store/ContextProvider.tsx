"use client";

import { ReactNode, useEffect, useReducer } from "react";
import Context, { defaultState } from "./Context";
import SocialNetworkAPI from "@/api/SocialNetworkAPI/SocialNetworkAPI";
import { IContext, IModalContext } from "./Context.types";
import { ISocialNetwork } from "@/models/ISocialNetwork";
import { IModal } from "@/models/IModal";
import { IClient } from "@/models/IClient";
import ClientAPI from "@/api/ClientAPI/ClientAPI";
import InfoAPI from "@/api/InfoAPI/InfoAPI";
import { IInfo } from "@/models/IInfo";
import { IDrawing } from "@/models/IDrawing";
import DrawingAPI from "@/api/DrawingAPI/DrawingAPI";
import { FETCH_MORE_LIMIT } from "@/constants/app";

type Action = {
  type: keyof IContext;
  payload: Partial<IContext[keyof IContext]>;
};

const reducer = (state: IContext, action: Action): IContext => {
  switch (action.type) {
    case "editInfoModal":
      return { ...state, editInfoModal: action.payload as IModal };
    case "editSocialNetworkModal":
      return { ...state, editSocialNetworkModal: action.payload as IModal };
    case "editDrawingModal":
      return { ...state, editDrawingModal: action.payload as IModal };
    case "changePasswordModal":
      return { ...state, changePasswordModal: action.payload as IModal };
    case "drawingModal":
      return { ...state, drawingModal: action.payload as IModal };
    case "setAppIsLoading":
      return { ...state, appIsLoading: action.payload as boolean };
    case "setInfo":
      return { ...state, info: action.payload as IInfo };
    case "setSocialNetworks":
      return { ...state, socialNetworks: action.payload as ISocialNetwork[] };
    case "setClients":
      return { ...state, clients: action.payload as IClient[] };
    case "setDrawings":
      return { ...state, drawings: action.payload as IDrawing[] };
    case "setDrawingsPageCount":
      return { ...state, drawingsPageCount: action.payload as number };
    default:
      return state;
  }
};

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [store, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    setAppIsLoading(true);
    Promise.all([
      InfoAPI.getOne(),
      SocialNetworkAPI.getAll(),
      ClientAPI.getAll(),
      DrawingAPI.getAll({ limit: FETCH_MORE_LIMIT, page: 1 }),
    ])
      .then(([infoData, socialNetworksData, clientsData, drawingsData]) => {
        setInfo(infoData);
        setSocialNetworks(socialNetworksData);
        setClients(clientsData);
        setDrawings(drawingsData.rows);
        const drawingsPageCount = Math.ceil(
          drawingsData.count / FETCH_MORE_LIMIT
        );
        setDrawingsPageCount(drawingsPageCount);
      })
      .finally(() => setTimeout(() => setAppIsLoading(false), 600));
  }, []);

  const setAppIsLoading = (appIsLoading: boolean) => {
    dispatch({ type: "setAppIsLoading", payload: appIsLoading });
  };

  const openModal = (
    modal: keyof IModalContext,
    props?: Partial<IModalContext[keyof IModalContext]>
  ) => {
    dispatch({ type: modal, payload: { isOpen: true, ...props } });
  };

  const closeModal = (
    modal: keyof IModalContext,
    props?: Partial<IModalContext[keyof IModalContext]>
  ) => {
    dispatch({ type: modal, payload: { isOpen: false, ...props } });
  };

  const setInfo = (info: IInfo) => {
    dispatch({ type: "setInfo", payload: info });
  };

  const setSocialNetworks = (socialNetworks: ISocialNetwork[]) => {
    dispatch({ type: "setSocialNetworks", payload: socialNetworks });
  };

  const addSocialNetwork = (socialNetwork: ISocialNetwork) => {
    const socialNetworks = [...store.socialNetworks, socialNetwork];
    dispatch({ type: "setSocialNetworks", payload: socialNetworks });
  };

  const updateSocialNetwork = (updatedSocialNetwork: ISocialNetwork) => {
    const socialNetworks = store.socialNetworks.map((socialNetwork) =>
      socialNetwork.id === updatedSocialNetwork.id
        ? updatedSocialNetwork
        : socialNetwork
    );
    dispatch({ type: "setSocialNetworks", payload: socialNetworks });
  };

  const deleteSocialNetwork = (id: number) => {
    const socialNetworks = store.socialNetworks.filter(
      (socialNetwork) => socialNetwork.id !== id
    );
    dispatch({ type: "setSocialNetworks", payload: socialNetworks });
  };

  const setClients = (clients: IClient[]) => {
    dispatch({ type: "setClients", payload: clients });
  };

  const addClients = (clients: IClient[]) => {
    const addedClients = [...store.clients, ...clients];
    dispatch({ type: "setClients", payload: addedClients });
  };

  const deleteClient = (id: number) => {
    const clients = store.clients.filter((client) => client.id !== id);
    dispatch({ type: "setClients", payload: clients });
  };

  const setDrawings = (drawings: IDrawing[]) => {
    dispatch({ type: "setDrawings", payload: drawings });
  };

  const addDrawings = (drawings: IDrawing[]) => {
    const addedDrawings = [...store.drawings, ...drawings];
    dispatch({ type: "setDrawings", payload: addedDrawings });
  };

  const updateDrawing = (updatedDrawing: IDrawing) => {
    const drawings = store.drawings.map((drawing) =>
      drawing.id === updatedDrawing.id ? updatedDrawing : drawing
    );
    dispatch({ type: "setDrawings", payload: drawings });
  };

  const deleteDrawing = (id: number) => {
    const drawings = store.drawings.filter((drawing) => drawing.id !== id);
    dispatch({ type: "setDrawings", payload: drawings });
  };

  const setDrawingsPageCount = (count: number) => {
    dispatch({ type: "setDrawingsPageCount", payload: count });
  };

  return (
    <Context.Provider
      value={{
        ...store,
        setAppIsLoading,
        openModal,
        closeModal,
        setInfo,
        setSocialNetworks,
        addSocialNetwork,
        updateSocialNetwork,
        deleteSocialNetwork,
        setClients,
        addClients,
        deleteClient,
        setDrawings,
        addDrawings,
        updateDrawing,
        deleteDrawing,
        setDrawingsPageCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
