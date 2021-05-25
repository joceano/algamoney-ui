export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-joceano.herokuapp.com',

  tokenWhitelistedDomains: [ /algamoney-api-joceano.herokuapp.com/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
