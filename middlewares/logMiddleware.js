const filesystem = require("fs");
const path = require("path");

const logMiddleware = (req, res, next) => {
  const newLog = {
    timestamp: new Date(),
    method: req.method,
    url: req.url,
    params: req.params,
    ip: req.ip,
  };

  const logFilePath = path.join(__dirname, "../data/logs.json");

  let existingLogs = [];

  try {
    existingLogs = JSON.parse(filesystem.readFileSync(logFilePath));
  } catch {
    existingLogs = [];
    console.log("Erro");
  }

  existingLogs.push(newLog);

  filesystem.writeFileSync(logFilePath, JSON.stringify(existingLogs, null));

  next();
};

module.exports = logMiddleware;
