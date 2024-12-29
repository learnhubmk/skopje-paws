export const logout = async (router) => {
    try {
        const response = await fetch("/api/auth/logout", {method: "POST"});
        if (response.ok) {
            router.push("/");
        } else {
            console.error("Failed to log out");
        }
    } catch {
        console.error("Something went wrong during logout");
    }
};