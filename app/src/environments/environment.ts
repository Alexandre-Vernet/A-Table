export const environment = {
    production: false,
    API_URL: 'http://localhost:8080/api',
    recipeUrl: () => `${ environment.API_URL }/recipe/`,
};
