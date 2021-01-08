import axios from "axios";
import {serverUrl} from '../util'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const fetchData = async () => {
  try {
    const response = await axios.get(`${serverUrl}/products/`, {
      cancelToken: source.token,
    });
    const data = await response.data;
    return data;
  } catch (e) {
    console.error(e);
  }
};

/* user api */

export const getUserFromMongo = async (firebase_uid) => {
  const response = await axios.get(`${serverUrl}/users`, {
    params:  {firebase_uid} ,
  });
  const user = await response.data;
  return user;
};

export const saveUserToMongo = async (data) => {
  const response = await axios.post(`${serverUrl}/users`,data);
  const user = await response.data;
  return user;
};

/* address */
export const postAddress = async(data) => {
  const response = await axios.post(`${serverUrl}/address`,data)
  const userId = await response.data.userId;
  return userId
}

export const getAddresses = async(userId)=>{
  const response = await axios.get(`${serverUrl}/address`,{
    params : {userId}
  })
  const addresses = await response.data;
  return addresses;
}

export const deleteAddress = async(_id) => {
  await axios.delete(`${serverUrl}/address`,{
    data : {_id}
  })
}

export const editAddress = async(data) => {
  console.log("api update data ",data);
  axios.put(`${serverUrl}/address`,data)
}

/* cart */

export const updateCart = async ({ cartItem, userId }) => {
  const response = await axios.put(
    `${serverUrl}/users/${userId}/cart`,
    {
      cartItem,
    }
  );
  const user = await response.data;
  return user;
};

export const getUserOrders = async (userId) => {
  const response = await axios.get(`${serverUrl}/orders/${userId}`);
  const orders = await response.data;
  return orders;
};

/* cloudinary api */

export const getFolders = async (path) => {
  const response = await axios.get(`${serverUrl}/files/folders/`, {
    params: { path },
  });
  const folders = await response.data;
  return folders;
};

export const getImages = async (path) => {
  console.log("image api path ",path);
  const response = await axios.get(`${serverUrl}/files/images/`, {
    params: { path },
  });
  const images = await response.data;
  return images;
};

export const createFolder = async (path) => {
  try {
    await axios.post(`${serverUrl}/files/folders/create_folder`, {
      path,
    });
  } catch (e) {
    console.error(e);
  }
};

export const createUploadPreset = async (object) => {
  try {
    await axios.post(`${serverUrl}/files/upload_preset`, object);
  } catch (error) {
    console.error(error);
  }
};

export const deleteFolderAsync = async (path) => {
  try {
    await axios.delete(`${serverUrl}/files/folders/delete_folder`, {
      data: { path },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteImages = async (resources) => {
  try {
    await axios.delete(`${serverUrl}/files/images/delete_images`, {
      data: { resources },
    });
  } catch (error) {
    console.error(error);
  }
};
