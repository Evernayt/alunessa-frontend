import { $authHost, $host } from "..";
import { IDrawing, IDrawingData } from "@/models/IDrawing";
import { CreateDrawingsDto } from "./dto/create-drawings.dto";
import { GetDrawingsDto } from "./dto/get-drawings.dto";
import { UpdateDrawingDto } from "./dto/update-drawing.dto";
import { ISort } from "@/models/ISort";

export default class DrawingAPI {
  static async create(
    createDrawingsDto?: CreateDrawingsDto[]
  ): Promise<IDrawing[]> {
    const { data } = await $authHost.post("drawings", createDrawingsDto);
    return data;
  }

  static async getAll(getDrawingsDto?: GetDrawingsDto): Promise<IDrawingData> {
    const { data } = await $host.get("drawings", { params: getDrawingsDto });
    return data;
  }

  static async update(updateDrawingDto?: UpdateDrawingDto): Promise<IDrawing> {
    const { data } = await $authHost.put("drawings", updateDrawingDto);
    return data;
  }

  static async sort(sort?: ISort[]): Promise<IDrawing[]> {
    const { data } = await $authHost.put("drawings/sort", sort);
    return data;
  }

  static async delete(id: number): Promise<boolean> {
    const { data } = await $authHost.delete(`drawings/${id}`);
    return data;
  }
}
