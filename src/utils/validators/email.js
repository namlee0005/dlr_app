const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

export const isEmailValid = (email) => emailRegex.test(email);
