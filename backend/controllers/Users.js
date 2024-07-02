import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: [
        "uuid",
        "user_id",
        "user_name",
        "role",
        "phone_no",
        "email",
        "corporate_account_no",
        "corporate_id",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: [
        "uuid",
        "user_id",
        "user_name",
        "role",
        "phone_no",
        "email",
        "corporate_account_no",
        "corporate_id",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    userName,
    userId,
    email,
    phoneNo,
    password,
    corporateAccountNo,
    corporateName,
    role,
  } = req.body;

  const hashPassword = await argon2.hash(password);

  try {
    await Users.create({
      corporate_account_no: corporateAccountNo,
      corporate_name: corporateName,
      user_id: userId,
      user_name: userName,
      role: role,
      email: email,
      password: hashPassword,
      phone_no: phoneNo,
    });

    res.status(201).json({ msg: "Register Behasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = (req, res) => {};

export const deleteUser = (req, res) => {};
