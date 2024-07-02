import Users from "../models/UserModel.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        [Op.and]: [
          { user_id: req.body.userId },
          { corporate_account_no: req.body.corporateAccountNo },
        ],
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    req.session.userUuid = user.uuid;
    const uuid = user.uuid;
    const userName = user.user_name;
    const userId = user.user_id;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ uuid, userName, userId, email, role });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Me = async (req, res) => {
  if (!req.session.userUuid) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }

  const user = await Users.findOne({
    where: {
      uuid: req.session.userUuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const uuid = user.uuid;
  const userName = user.user_name;
  const userId = user.user_id;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uuid, userName, userId, email, role });
};

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
