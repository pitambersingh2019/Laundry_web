export function getAdmin() {
  const token = localStorage.getItem("adminToken");
  const user = localStorage.getItem("adminUser");

  if (!token || !user) return null;

  return JSON.parse(user);
}

export function logoutAdmin() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
}
