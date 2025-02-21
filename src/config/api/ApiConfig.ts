import axios from "axios";

const api_domain = import.meta.env.VITE_API_DOMAIN;

export const useApiConfig = () => {
  const get = async ({ url, params }) => {
    const api_link = params
      ? `${api_domain}/${url}/${params}`
      : `${api_domain}/${url}`;

    const response = await axios.get(api_link);

    return response.data;
  };

  const post = async ({ url, body }) => {
    const response = await axios.post(`${api_domain}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    return response.data;
  };

  const put = async ({ url, body, headers }) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return response.json();
  };

  const del = async ({ url, headers }) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    return response.json();
  };

  return { get, post, put, del };
};
