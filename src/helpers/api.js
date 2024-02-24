import axios from "axios";

const carsInstance = axios.create({
    baseURL: 'https://65d047afab7beba3d5e2ed14.mockapi.io/api/v1',
  });

  

export const requestCarsList = async (page = 1, limit = 12) => {
    const { data } = await carsInstance.get(`/adverts?page=${page}&limit=${limit}`);
    return data;
  };
  