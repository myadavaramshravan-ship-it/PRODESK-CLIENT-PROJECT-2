const generateTicketNumber = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `TKT-${random}`;
};

module.exports = generateTicketNumber;