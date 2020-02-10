import {ipInfoAccessToken as token} from '/src/utils/constants.js';

export async function getPostCode() {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    const data = await response.json();

    return data.postal;
  } catch (e) {
    console.error(e);
  }
};
