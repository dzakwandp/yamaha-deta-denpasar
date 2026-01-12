export const useAuth = () => {
  const store = useAuthStore();
  const { user, isAuthenticated } = storeToRefs(store);
  const { login, logout, initAuth } = store;

  return {
    user,
    isAuthenticated,
    login,
    logout,
    initAuth,
  };
};
