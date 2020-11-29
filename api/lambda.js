const serverless = require('serverless-http');
const { getServer } = require('./index');

let handler;

module.exports.handler = async (event, context) => {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (!handler) {
    const app = await getServer();
    handler = serverless(app, {
      request: (request) => {
        request.serverless = { event, context };
      },
    });
  }

  const res = await handler(event, context);

  return res;
};
