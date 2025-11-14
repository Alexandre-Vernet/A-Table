export const environment = {
    production: false,
    API_URL: 'http://localhost:8080/api',
    recipeUrl: () => `${ environment.API_URL }/recipe`,
    authUrl: () => `${ environment.API_URL }/auth`,
    userUrl: () => `${ environment.API_URL }/users`,
    recipeSavedUrl: () => `${ environment.API_URL }/recipe-saved`,
    EMAIL_JS: {
        PUBLIC_KEY: 'd3gvz9u7Hm4sLnK2e',
        SERVICE_ID: 'service_4b174bh',
        TEMPLATE_ID: 'template_6oukjrr'
    }
};
