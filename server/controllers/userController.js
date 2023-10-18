import UserModel from "../model/Usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ENV from "../config.js";
import connectDB from "../database/conn.js";

//Login
export async function login(req, res) {
  connectDB();


}

//GET
export async function getUser(req, res) {
  connectDB();


}

// logout
export async function logout(req, res) {

}
