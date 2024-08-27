import { IClient } from "@/models/IClient";
import { $authHost, $host } from "..";
import { CreateClientsDto } from "./dto/create-clients.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ISort } from "@/models/ISort";

export default class ClientAPI {
  static async create(createClientsDto?: CreateClientsDto[]): Promise<IClient[]> {
    const { data } = await $authHost.post("clients", createClientsDto);
    return data;
  }

  static async getAll(): Promise<IClient[]> {
    const { data } = await $host.get("clients");
    return data;
  }

  static async update(updateShopDto?: UpdateClientDto): Promise<IClient> {
    const { data } = await $authHost.put("clients", updateShopDto);
    return data;
  }

  static async sort(sort?: ISort[]): Promise<IClient[]> {
    const { data } = await $authHost.put("clients/sort", sort);
    return data;
  }

  static async delete(id: number): Promise<boolean> {
    const { data } = await $authHost.delete(`clients/${id}`);
    return data;
  }
}
