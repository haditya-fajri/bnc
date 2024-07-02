import User from "../models/UserModel.js";

export const VerifyUser = async (req, res, next) => {
  if (!req.session?.userUuid) {
    return res.status(401).json({ msg: "Unauthorized, Please Login!" });
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userUuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  req.userUuid = user.uuid;
  req.role = user.role;
  req.corporateAccountNo = user.corporate_account_no;

  next();
};

export const MakerOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userUuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "maker")
    return res.status(403).json({ msg: "Forbidden Access" });
  next();
};

export const CheckerOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userUuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "checker")
    return res.status(403).json({ msg: "Forbidden Access" });
  next();
};
