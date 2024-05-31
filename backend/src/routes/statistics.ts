import getOutstandingRent from "@/controllers/statistics/getOutstandingRent";
import getTopRented from "@/controllers/statistics/getTopRented";
import getTopRentedGroupByBook from "@/controllers/statistics/getTopRentedGroupBook";
import { Hono } from "hono";

const statistics = new Hono();

statistics.get("/top-rented", getTopRented);
statistics.get("/top-rented-by-book", getTopRentedGroupByBook);
statistics.get("/outstanding-rent", getOutstandingRent);

export default statistics;
