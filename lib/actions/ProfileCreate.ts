export const ProfileCreate = async () => {
    const res = await fetch("http://localhost:5000/api/profile/create", {
        method: "POST",
    });
    return res.json();
};