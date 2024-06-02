import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(api + "/photos", config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || responseData.error || "Erro ao publicar foto");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/user/" + id, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao carregar fotos do usuário");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const getPhoto = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao carregar foto");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", "", token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao excluir foto");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const updatePhoto = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao atualizar foto");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const like = async (id, token) => {
    const config = requestConfig("PUT", null, token);

    try {
        const res = await fetch(api + "/photos/like/" + id, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao dar like");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const comment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "/photos/comment/" + id, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao comentar");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const getPhotos = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos", config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao carregar fotos");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const searchPhotos = async (query, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/search?q=" + query, config)
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.errors || "Erro ao pesquisar");
        }

        return responseData;
    } catch (error) {
        return { errors: [error.message] };
    }
};

const photoService = {
    publishPhoto,
    getUserPhotos,
    getPhoto,
    deletePhoto,
    updatePhoto,
    like,
    comment,
    getPhotos,
    searchPhotos,
};

export default photoService;