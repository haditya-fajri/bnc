import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Transactions = db.define(
  "transactions",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    instruction_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from_account_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    transfer_record: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transfer_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    transfer_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    transfer_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    makerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approverId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Transactions.belongsTo(Users, {
  as: "Maker",
  foreignKey: "makerId",
  targetKey: "uuid",
});
Transactions.belongsTo(Users, {
  as: "Approver",
  foreignKey: "approverId",
  targetKey: "uuid",
});
Users.hasMany(Transactions, {
  as: "MadeTransactions",
  foreignKey: "makerId",
  sourceKey: "uuid",
});
Users.hasMany(Transactions, {
  as: "ApprovedTransactions",
  foreignKey: "approverId",
  sourceKey: "uuid",
});

export default Transactions;
