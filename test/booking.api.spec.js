import axios from 'axios';
import { expect } from 'chai';
import createBookingPayload from '../data/create-booking-payload.js';
import bookingApi from '../api/booking-api.js';


const baseURL = 'https://restful-booker.herokuapp.com';

describe('Booking API Tests', () => {
  let bookingId;

  it('should create a booking', async () => {

    const bookingData = {
      firstname: "John",
      lastname: "Doe",
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: "2023-01-01",
        checkout: "2023-01-05"
      },
      additionalneeds: "Breakfast"
    };
    const response = bookingApi.createBooking(bookingData)

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('bookingid');
    expect(response.data.booking.firstname).to.equal('John');
    expect(response.data.booking.lastname).to.equal('Doe');
  });

  // it('should get the booking', async () => {
  //   const response = await get(`${baseURL}/booking/${bookingId}`);
  //   expect(response.status).to.equal(200);
  //   expect(response.data.firstname).to.equal("John");
  // });

  // it('should update the booking (Negative without token)', async () => {
  //   try {
  //     await put(`${baseURL}/booking/${bookingId}`, {
  //       firstname: "Jane",
  //       lastname: "Smith",
  //       totalprice: 200,
  //       depositpaid: false,
  //       bookingdates: {
  //         checkin: "2023-02-01",
  //         checkout: "2023-02-05"
  //       },
  //       additionalneeds: "None"
  //     });
  //   } catch (error) {
  //     expect(error.response.status).to.equal(403); // Forbidden without auth
  //   }
  // });

  // it('should delete booking (Negative without token)', async () => {
  //   try {
  //     delete (`${baseURL}/booking/${bookingId}`);
  //   } catch (error) {
  //     expect(error.response.status).to.equal(403);
  //   }
  // });
});