import axios from 'axios';
import { expect } from 'chai';
import bookingApi from '../api/booking-api.js';
import createBookingPayload from '../data/create-booking-payload.js';

const baseURL = 'https://restful-booker.herokuapp.com';

describe('Booking API Tests', () => {
  let bookingId;

  it('should create a booking', async () => {
    const response = await bookingApi.createBooking(createBookingPayload);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('bookingid');
    expect(response.data.booking.firstname).to.equal(createBookingPayload.firstname);
    expect(response.data.booking.lastname).to.equal(createBookingPayload.lastname);
  });

  it('should get the booking', async () => {
    const createBookingResponse = await bookingApi.createBooking(createBookingPayload);
    const getBookingResponse = await bookingApi.getBooking(createBookingResponse.data.bookingid);
    expect(getBookingResponse.status).to.equal(200);
    expect(getBookingResponse.data.firstname).to.equal(createBookingPayload.firstname);
  });

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