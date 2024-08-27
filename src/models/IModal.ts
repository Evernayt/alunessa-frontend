import { IDrawing } from "./IDrawing";
import { IInfo } from "./IInfo";
import { ISocialNetwork } from "./ISocialNetwork";

export interface IModal {
  isOpen: boolean;
  isAdd: boolean;
}

export interface IEditInfoModal extends IModal {
  info?: IInfo | null;
}

export interface IEditSocialNetworkModal extends IModal {
  socialNetwork?: ISocialNetwork;
}

export interface IEditDrawingModal extends IModal {
  drawing?: IDrawing;
}

export interface IDrawingModal extends IModal {
  drawing?: IDrawing;
}
