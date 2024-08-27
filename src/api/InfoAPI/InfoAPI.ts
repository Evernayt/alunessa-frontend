import { $authHost, $host } from "..";
import { IInfo } from "@/models/IInfo";
import { UpdateInfoDto } from "./dto/update-info.dto";

export default class InfoAPI {
  static async getOne(): Promise<IInfo> {
    const { data } = await $host.get("info");
    return data;
  }

  static async update(updateInfoDto?: UpdateInfoDto): Promise<IInfo> {
    const { data } = await $authHost.put("info", updateInfoDto);
    return data;
  }
}
