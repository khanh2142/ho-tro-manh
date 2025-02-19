import { userService } from "../../services/User/UserService";
import { useApiConfig } from "./ApiConfig";

export const useApiService = () => {
  const apiConfig = useApiConfig();

  const user_api = userService(apiConfig);

  return {
    ...user_api,
  };
};
