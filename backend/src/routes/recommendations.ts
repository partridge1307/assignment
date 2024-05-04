import getRecommendation from "@/controllers/recommendations/getRecommendation";
import { Hono } from "hono";

const recommendations = new Hono();

recommendations.get("/", getRecommendation)

export default recommendations; 
