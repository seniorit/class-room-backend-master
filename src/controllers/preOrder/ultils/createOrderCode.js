module.exports = () => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace(/[-T:]/g, "");
  const randomCode = Math.floor(10000 + Math.random() * 90000);

  const orderCode = `ORDER-${formattedDate}-${randomCode}`;

  return orderCode;
};
