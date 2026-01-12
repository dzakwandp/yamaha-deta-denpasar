export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, initAuth } = useAuth();

  // Initialize auth state
  if (process.server || !isAuthenticated.value) {
    initAuth();
  }

  // Only protect /dashadmin routes
  if (to.path.startsWith("/dashadmin")) {
    // Allow access to login page
    if (to.path === "/dashadmin/login") {
      if (isAuthenticated.value) {
        return navigateTo("/dashadmin");
      }
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated.value) {
      return navigateTo("/dashadmin/login");
    }
  }
});
