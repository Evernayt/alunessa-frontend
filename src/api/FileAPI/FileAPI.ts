import { $authHost } from "..";
import { DeleteFileDto } from "./dto/deleteFileDto";

export default class FileAPI {
  static async uploadAvatar(file: File): Promise<{ fileName: string }> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await $authHost.post("files/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }

  static async uploadIcon(file: File): Promise<{ fileName: string }> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await $authHost.post("files/upload-icon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }

  static async uploadImages(files: FileList | File[]): Promise<{
    images: { originalFileName: string; compressedFileName: string }[];
  }> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const { data } = await $authHost.post("files/upload-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }

  static async deleteFile(deleteFileDto: DeleteFileDto): Promise<boolean> {
    const { data } = await $authHost.get("files/delete-file", {
      params: deleteFileDto,
    });
    return data;
  }
}
