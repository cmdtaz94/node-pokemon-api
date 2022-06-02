const getValidationErrors = (error) => {
  const errors = {};

  error.errors.map((item) =>
    item.path in errors
      ? errors[item.path].push(item.message)
      : (errors[item.path] = [item.message])
  );

  return errors;
};

module.exports = {
  getValidationErrors,
};
