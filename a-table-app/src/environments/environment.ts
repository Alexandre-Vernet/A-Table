export const environment = {
    production: false,
    API_URL: 'http://localhost:8080/api',
    recipeUrl: () => `${ environment.API_URL }/recipe`,
    authUrl: () => `${ environment.API_URL }/auth`,
    userUrl: () => `${ environment.API_URL }/users`,
    uploadUrl: () => `${ environment.API_URL }/upload`,
    recipeSavedUrl: () => `${ environment.API_URL }/recipe-saved`,
};
