export const environment = {
    production: true,
    API_URL: 'https://a-table-api.alexandre-vernet.fr/api',
    recipeUrl: () => `${ environment.API_URL }/recipe`,
    authUrl: () => `${ environment.API_URL }/auth`,
    userUrl: () => `${ environment.API_URL }/users`,
    uploadUrl: () => `${ environment.API_URL }/upload`,
    recipeSavedUrl: () => `${ environment.API_URL }/recipe-saved`,
};
