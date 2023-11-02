const requestCountByIP = {};

const rateLimit = (req, res, next) => {
  const clientIP = req.clientIP;

  if (requestCountByIP[clientIP]) {
    if (requestCountByIP[clientIP] > 5) {
      return res.status(429).json({
        error: "Você atingiu o limite de requisições a cada 30 segundos",
      });
    }

    requestCountByIP[clientIP]++;
  } else {
    requestCountByIP[clientIP] = 1;

    setTimeout(() => {
      delete requestCountByIP[clientIP];
    }, 30000);
  }

  next();
};

module.exports = rateLimit;
