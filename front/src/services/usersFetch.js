async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur réseau");
    }

    return response.json();
}

export const register = async (username, email, password) => {
    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        return { data, ok: response.ok };
    } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        throw new Error(error.message || "Erreur lors de l'enregistrement.");
    }
};

export const login = async (username, password) => {
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return { data, ok: response.ok };
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw new Error(error.message || "Erreur lors de la connexion.");
    }
};

export async function updatePassword(oldPassword, newPassword) {
    try {
        const data = await fetchWithAuth(
            "http://localhost:3000/api/updatePassword",
            {
                method: "PUT",
                body: JSON.stringify({ oldPassword, newPassword }),
            }
        );
        console.log("Mot de passe mis à jour avec succès", data);
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour du mot de passe:",
            error.message
        );
    }
}

export async function getUserInfo() {
    try {
        const data = await fetchWithAuth("http://localhost:3000/api/users", {
            method: "GET",
        });
        console.log(
            "Informations de l'utilisateur récupérées avec succès",
            data
        );
        return data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des informations de l'utilisateur:",
            error.message
        );
    }
}

export function logout() {
    localStorage.removeItem("token");
    console.log("Déconnexion réussie");
}
