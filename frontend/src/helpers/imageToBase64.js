const imageToBase64 = async (image) => {
  const reader = new FileReader();

  const data = await new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(image); // Move this inside the Promise setup
  });

  return data;
};

export default imageToBase64;
