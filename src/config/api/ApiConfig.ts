export const useApiConfig = () => {
  const get = async ({ url, params, headers }) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    return response.json();
  };

  const post = async ({ url, body, headers }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return response.json();
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
