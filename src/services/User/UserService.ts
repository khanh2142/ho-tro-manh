export const userService = (apiConfig) => {
  return {
    user_search: async ({ params }) => {
      return await apiConfig.get({
        url: `common/user`,
        params: params,
      });
    },
    user_create: async ({ body }) => {
      return await apiConfig.post({
        url: `common/user/create-user`,
        body: body,
      });
    },
  };
};
