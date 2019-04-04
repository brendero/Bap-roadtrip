import axios from 'axios';

const cloudinaryUpload = source => {
  const cloud = 'duzvjytv0';
  const uploadPreset = 'roadtrip';

  const upload_url = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`
  
  const formData = new FormData()
  formData.append('upload_preset', uploadPreset)
  formData.append('file', source)

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: upload_url,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      },
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}
export default cloudinaryUpload;