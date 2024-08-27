import { SERVER_API_URL } from "@/constants/api";

const createFileURL = (
  folder: "avatar" | "icons" | "images",
  fileName: string | undefined
) => {
  return `${SERVER_API_URL}/${folder}/${fileName}`;
};

export default createFileURL;
