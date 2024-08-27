const getFileImageSrc = (image: File | null) => {
  return image ? URL.createObjectURL(image) : undefined;
};

export default getFileImageSrc;
