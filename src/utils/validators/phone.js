const phoneNumberRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

export const isPhoneValid = () => {};

export const validatePhoneNumber = (phoneNumber) =>
  phoneNumberRegex.test(phoneNumber);
