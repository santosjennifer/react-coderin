import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);

    try {
        const res = await fetch(api + "/users/profile", config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao carregar perfil");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true);

    try {
        const res = await fetch(api + "/users/", config);
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || responseData.error || "Erro ao atualizar perfil");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const getUserDetails = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + "/users/" + id, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao carregar perfil");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const userService = {
    profile,
    updateProfile,
    getUserDetails,
};

export default userService;