import axios from 'axios';

class BookingApi {
  constructor(baseUrl = 'https://restful-booker.herokuapp.com') {
    this.baseUrl = baseUrl;
  }

  async getAuthToken(username = 'admin', password = 'password123') {
    const response = await axios.post(`${this.baseUrl}/auth`, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.token;
  }

  async createBooking(data) {
    const response = await axios.post(`${this.baseUrl}/booking`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response;
  }

  async getBooking(id) {
    const response = await axios.get(`${this.baseUrl}/booking/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return response;
  }

  async updateBooking(id, data, token) {
    if (!token) {
      throw new Error('Token is required for updateBooking');
    }
    const response = await axios.put(`${this.baseUrl}/booking/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`,
      },
    });
    return response;
  }

  async deleteBooking(id, token) {
    if (!token) {
      throw new Error('Token is required for deleteBooking');
    }
    const response = await axios.delete(`${this.baseUrl}/booking/${id}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
    });
    return response;
  }

  async deleteBookingWithoutToken(id) {
    const response = await axios.delete(`${this.baseUrl}/booking/${id}`);
    return response;
  }
}

export default new BookingApi();