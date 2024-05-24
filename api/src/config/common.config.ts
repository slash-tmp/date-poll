export default () => {
  const WEBSITE_BASE_URL =
    process.env.WEBSITE_BASE_URL ||
    (process.env.HEROKU_APP_NAME &&
      `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`) ||
    'http://localhost:3000';

  return {
    WEBSITE_BASE_URL,
  };
};
