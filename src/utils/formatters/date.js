export const convertTimestampToHours = (timestamp) => {
  let minutes = Math.floor((timestamp / (1000 * 60)) % 60),
    hours = Math.floor((timestamp / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes;
};

export const convertLongToTime = (countDown) => {
  let min =
    Math.floor(countDown / 1000 / 60) < 10
      ? '0' + Math.floor(countDown / 1000 / 60)
      : Math.floor(countDown / 1000 / 60);
  let sec =
    Math.floor((countDown / 1000) % 60) < 10
      ? '0' + Math.floor((countDown / 1000) % 60)
      : Math.floor((countDown / 1000) % 60);
  return min + ':' + sec;
};

export const convertLongToTime1 = (countDown) => {
  let min =
    Math.floor(countDown / 1000 / 60) < 10
      ? '0' + Math.floor(countDown / 1000 / 60)
      : Math.floor(countDown / 1000 / 60);
  let sec =
    Math.floor((countDown / 1000) % 60) < 10
      ? '0' + Math.floor((countDown / 1000) % 60)
      : Math.floor((countDown / 1000) % 60);
  return min + 'p : ' + sec + 's';
};
