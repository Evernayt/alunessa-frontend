export class DeleteFileDto {
  readonly folder?: "avatar" | "icons" | "images";
  readonly fileNames?: string[];
}
