export const environment = {
    production: true,
    API_URL: 'https://a-table-api.alexandre-vernet.fr/api',
    recipeUrl: () => `${ environment.API_URL }/recipe`,
    authUrl: () => `${ environment.API_URL }/auth`,
    userUrl: () => `${ environment.API_URL }/users`,
    recipeSavedUrl: () => `${ environment.API_URL }/recipe-saved`,
    EMAIL_JS: {
        PUBLIC_KEY: 'd3gvz9u7Hm4sLnK2e',
        SERVICE_ID: 'service_4b174bh',
        TEMPLATE_ID: 'template_6oukjrr'
    },
    primeNgLicense: 'eyJpZCI6ImM1OWY4NWI0LTQ4YTUtNGY5ZC04YzcyLTgyOGI0MDcyMzNhMiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODgzODIzNDEsImV4cCI6MTgxOTkxODM0MX0.IHY8nQlw0y6ThAhSqqpNUVDPvf7lHSxNWzbFM5SowRT8R0HnPXfOO7V62vUwtvRErUuiW9JikXt3gNOy56YvAQ',
};
