import { IData } from "./IData";

export interface IDrawing {
  id: number;
  name: string;
  description: string;
  originalImageName: string;
  compressedImageName: string;
}

export type IDrawingData = IData<IDrawing[]>;
