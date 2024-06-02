import { api, requestConfig } from "../utils/config";

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config);
    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.errors || "Erro ao registrar");
    }

    localStorage.setItem("user", JSON.stringify(responseData));
    return responseData;
  } catch (error) {
    return { errors: [error.message] };
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config);
    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.errors || "Erro ao fazer login");
    }

    localStorage.setItem("user", JSON.stringify(responseData));
    return responseData;
  } catch (error) {
    return { errors: [error.message] };
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;