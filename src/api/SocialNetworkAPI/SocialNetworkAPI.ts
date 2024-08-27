import { $authHost, $host } from "..";
import { ISocialNetwork } from "@/models/ISocialNetwork";
import { CreateSocialNetworkDto } from "./dto/create-social-network.dto";
import { UpdateSocialNetworkDto } from "./dto/update-social-network.dto";
import { ISort } from "@/models/ISort";

export default class SocialNetworkAPI {
  static async create(
    createSocialNetworkDto?: CreateSocialNetworkDto
  ): Promise<ISocialNetwork> {
    const { data } = await $authHost.post(
      "social-networks",
      createSocialNetworkDto
    );
    return data;
  }

  static async getAll(): Promise<ISocialNetwork[]> {
    const { data } = await $host.get("social-networks");
    return data;
  }

  static async update(
    updateSocialNetworkDto?: UpdateSocialNetworkDto
  ): Promise<ISocialNetwork> {
    const { data } = await $authHost.put(
      "social-networks",
      updateSocialNetworkDto
    );
    return data;
  }

  static async sort(sort?: ISort[]): Promise<ISocialNetwork[]> {
    const { data } = await $authHost.put("social-networks/sort", sort);
    return data;
  }

  static async delete(id: number): Promise<boolean> {
    const { data } = await $authHost.delete(`social-networks/${id}`);
    return data;
  }
}
