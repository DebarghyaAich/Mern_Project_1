class apiResponse {
  constructor(statusCode, data, message = "Successfully done !!") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400 ? true : false;
  }
}

export { apiResponse };
