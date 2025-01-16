export const saveUser = async user => {
    await axios.post(`${import.meta.env.VITE_API}/users/${user?.email}`, {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
    })
}