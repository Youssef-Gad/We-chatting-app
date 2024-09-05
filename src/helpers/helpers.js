export function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getCurrentTime() {
  const date = new Date();
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  const timeString = date.toLocaleString("en-US", options);
  return timeString.toLowerCase();
}

export function convertTime(time) {
  if (isISOTime(time)) {
    const date = new Date(time);
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      date,
    );
    return formattedTime.toLowerCase();
  } else return time;
}

export function isISOTime(str) {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return iso8601Regex.test(str);
}
