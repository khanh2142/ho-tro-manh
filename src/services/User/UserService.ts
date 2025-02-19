export const userService = (apiConfig) => {
  return {
    user_search: async ({ query }) => {
      return await apiConfig.get({
        url: `common/user`,
        params: {
          query,
        },
      });
    },
  };
};
