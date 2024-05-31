import { Hono } from "hono";
import { requireAdmin } from "@/middlewares/auth";
import getUsers from "@/controllers/users/getUsers";
import AddUser from "@/controllers/users/addUser";
import getUser from "@/controllers/users/getUser";
import editUser from "@/controllers/users/editUser";
import getUserByName from "@/controllers/users/getUserByName";

const users = new Hono();

users.get("/", requireAdmin, getUsers);
users.get("/name", requireAdmin, getUserByName);
users.get("/:id", requireAdmin, getUser);
users.post("/add", requireAdmin, AddUser);
users.post("/edit/:id", requireAdmin, editUser);

export default users;
