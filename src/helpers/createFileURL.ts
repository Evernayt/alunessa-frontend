const createFileURL = (
  folder: "avatar" | "icons" | "images",
  fileName: string | undefined
) => {
  return `${process.env.NEXT_PUBLIC_SERVER_API_URL}/${folder}/${fileName}`;
};

export default createFileURL;
