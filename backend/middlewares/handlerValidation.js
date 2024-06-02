const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push(err.msg));
    return res.status(422).json({
      errors: extractedErrors,
    });
  }

  next();
};

const handleError = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { validate, handleError };