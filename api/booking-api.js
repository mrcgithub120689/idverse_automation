import axios from 'axios';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const bookingApi = {
  async createBooking(data) {
    const response = await axios.post(`${BASE_URL}/booking`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response;
  },

  async getBooking(id) {
    const response = await axios.get(`${BASE_URL}/booking/${id}`);
    return response;
  },

  async updateBooking(id, data, token) {
    const response = await axios.put(`${BASE_URL}/booking/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
    });
    return response;
  },

  async deleteBooking(id, token) {
    const response = await axios.delete(`${BASE_URL}/booking/${id}`, {
      headers: {
        'Cookie': `token=${token}`
      },
    });
    return response;
  }
};

export default bookingApi;