export const environment = {
    production: true,
    API_URL: 'https://a-table-api.alexandre-vernet.fr/api',
    recipeUrl: () => `${ environment.API_URL }/recipe/`,
};
