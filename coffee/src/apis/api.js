const BASE_URL = "http://127.0.0.1:8080/https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const fullUrl = `${BASE_URL}${url}`;
    const res = await fetch(fullUrl);

    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error(res.message);
  } catch (err) {
    alert(err.message);
  }
};

export const getProductList = async () => await request("/products");
export const getIdProduct = async (id) => await request(`/products/${id}`);
