export const authfetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  
  const finalOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers
    }
  }
  const res = await fetch(url, finalOptions);
  return await res.json();
}