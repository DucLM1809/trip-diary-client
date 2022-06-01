export const uploadImage = async (file) => {
  console.log(file);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'uadhrbdk');

  const { data } = await axios.post(
    'https://api.cloudinary.com/v1_1/ttq186/image/upload',
    formData
  );
  console.log(data.url);
  return data.url;
};
