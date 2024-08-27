const TOKEN_KEY = "TOKEN_KEY";

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token || "";
};

export { setToken, getToken };
