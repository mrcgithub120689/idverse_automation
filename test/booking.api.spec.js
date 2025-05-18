import { expect } from 'chai';
import bookingApi from '../api/booking-api.js';
import createBookingPayload from '../data/create-booking-payload.js';

describe('Booking API Tests', () => {

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

  it('should return 403 when trying to delete booking without token - negative', async function () {
    const createBookingResponse = await bookingApi.createBooking(createBookingPayload);
    try {
      await bookingApi.deleteBookingWithoutToken(createBookingResponse.data.bookingid);
      throw new Error('Expected deleteBooking to fail without token');
    } catch (error) {
      expect(error.response.status).to.equal(403);
    }
  });

  it('should update a booking successfully', async function () {
    const createResponse = await bookingApi.createBooking(createBookingPayload);
    const bookingId = createResponse.data.bookingid;
    const token = await bookingApi.getAuthToken();
    const updatedData = {
      firstname: "Jane",
      lastname: "Smith",
      totalprice: 456,
      depositpaid: false,
      bookingdates: {
        checkin: "2025-06-01",
        checkout: "2025-06-05"
      },
      additionalneeds: "Lunch"
    };
    const updateResponse = await bookingApi.updateBooking(bookingId, updatedData, token);

    expect(updateResponse.status).to.equal(200);
    expect(updateResponse.data).to.deep.include(updatedData);
  });

  it('should delete a booking successfully', async () => {
    const createResponse = await bookingApi.createBooking(createBookingPayload);
    const bookingId = createResponse.data.bookingid;
    const token = await bookingApi.getAuthToken();
    const deleteResponse = await bookingApi.deleteBooking(bookingId, token);

    expect(deleteResponse.status).to.equal(201); // The API returns 201 on successful delete

    try {
      await bookingApi.getBooking(bookingId);
      throw new Error('Expected getBooking to fail after deletion');
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });
});