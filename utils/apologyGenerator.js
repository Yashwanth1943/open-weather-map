export const generateApology = (customer, city, weather) => {
  return `Hi ${customer}, your order to ${city} is delayed due to ${weather.toLowerCase()}. We appreciate your patience!`;
};