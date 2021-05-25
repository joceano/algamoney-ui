export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-joceano.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoney-api-joceano.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
