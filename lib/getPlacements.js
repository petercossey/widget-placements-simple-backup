import fetch from "node-fetch";

async function getPlacements(storeHash, accessToken) {
  const url = `https://api.bigcommerce.com/stores/${storeHash}/v3/content/placements`;

  try {
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": accessToken
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error: Unable to fetch data from the API.', error)
  }
}

export default getPlacements;