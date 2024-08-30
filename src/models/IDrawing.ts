import { IData } from "./IData";

export interface IDrawing {
  id: number;
  name: string;
  description: string;
  mediumImage: string;
  smallImage: string;
  mediumWidth: number;
  mediumHeight: number;
  smallWidth: number;
  smallHeight: number;
  blurHash: string;
}

export type IDrawingData = IData<IDrawing[]>;
