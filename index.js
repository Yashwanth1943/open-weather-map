import fs from "fs";
import { getWeather } from "./services/weatherService.js";
import { generateApology } from "./utils/apologyGenerator.js";
import dotenv from "dotenv";
dotenv.config();

const orders = JSON.parse(
  fs.readFileSync("./data/orders.json", "utf-8")
);

const processOrders = async () => {
  try {
    const results = await Promise.all(
      orders.map(async (order) => {
        const weather = await getWeather(order.city);

        if (!weather) return order;

        if (["Rain", "Snow", "Extreme"].includes(weather)) {
          order.status = "Delayed";
          order.message = generateApology(
            order.customer,
            order.city,
            weather
          );
        }

        return order;
      })
    );

    fs.writeFileSync(
      "./output/updated_orders.json",
      JSON.stringify(results, null, 2)
    );

    console.log("Orders processed successfully!");
  } catch (err) {
    console.error("Unexpected Error:", err.message);
  }
};

processOrders();