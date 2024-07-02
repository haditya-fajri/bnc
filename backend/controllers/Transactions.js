import Transaction from "../models/TransactionModel.js";
import TransactionDetail from "../models/TransactionDetailModel.js";
import paginate from "express-paginate";
import User from "../models/UserModel.js";
import { Sequelize } from "sequelize";

export const getTransactions = async (req, res) => {
  const [rows, count] = await Promise.all([
    Transaction.findAll({
      limit: req.query.limit,
      offset: req.skip,
      include: [
        {
          model: User,
          as: "Maker",
          attributes: ["user_name"],
        },
        {
          model: User,
          as: "Approver",
          attributes: ["user_name"],
        },
      ],
    }),
    Transaction.count(),
  ]);
  const itemCount = count;
  const pageCount = Math.ceil(count / req.query.limit);

  const modifiedResponse = rows.map((transaction, index) => ({
    no: req.skip + index + 1,
    referenceNo: transaction.uuid,
    instructionType: transaction.instruction_type,
    fromAccountNo: transaction.from_account_no,
    transferType: transaction.transfer_type,
    transferRecord: transaction.transfer_record,
    transferAmount: transaction.transfer_amount,
    transferDate: transaction.transfer_date,
    makerId: transaction.makerId,
    makerName: transaction.Maker ? transaction.Maker.user_name : null,
    approverId: transaction.approverId,
    approverName: transaction.Approver ? transaction.Approver.user_name : null,
    status: transaction.status,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  }));

  res.status(200).json({
    data: modifiedResponse,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
  });
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: User,
          as: "Maker",
          attributes: ["user_name"],
        },
      ],
    });

    const transactionDetails = await TransactionDetail.findAll({
      where: {
        transaction_id: req.params.id,
      },
    });

    const details = transactionDetails.map((detail, index) => ({
      no: index + 1,
      transactionId: transaction.uuid,
      toBankName: detail.to_bank_name,
      toAccountNo: detail.to_account_no,
      toAccountName: detail.to_account_name,
      transferAmount: detail.transfer_amount,
      status: transaction.status,
    }));

    const instructionType =
      transaction.instruction_type === 1 ? "Immediate" : "Standing Instruction";

    const response = {
      fromAccountNo: transaction.from_account_no,
      submitDatetime: transaction.createdAt,
      transferDate: transaction.transfer_date,
      instructionType,
      makerName: transaction.Maker.user_name,
      referenceNo: transaction.uuid,
      transferType: "Online",
      totalTransferRecord: transaction.transfer_record,
      totalTransferAmount: transaction.transfer_amount,
      details,
    };

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const {
      instructionType,
      transferRecord,
      transferAmount,
      transferDate,
      transferType,
      transactionDetails,
    } = req.body;

    const transaction = await Transaction.create({
      instruction_type: instructionType,
      from_account_no: req.corporateAccountNo,
      transfer_type: transferType,
      transfer_record: transferRecord,
      transfer_amount: transferAmount,
      transfer_date: transferDate,
      makerId: req.userUuid,
      status: "Awaiting Approval",
    });

    const details = transactionDetails.map((detail) => ({
      transaction_id: transaction.uuid,
      to_bank_name: detail.toBankName,
      to_account_no: detail.toAccountNo,
      to_account_name: detail.toAccountName,
      transfer_amount: detail.transferAmount,
    }));

    await TransactionDetail.bulkCreate(details);

    res.status(201).json({ msg: "Create the transaction successful" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  const { status } = req.body;
  try {
    const transaction = await Transaction.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!transaction) return res.status(404).json({ msg: "Data not found" });

    await Transaction.update({
      status,
      approverId: req.userUuid,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const overviewTransaction = async (req, res) => {
  try {
    const statusCounts = await Transaction.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
      raw: true,
    });

    const counts = statusCounts.reduce((acc, { status, count }) => {
      switch (status) {
        case "Awaiting Approval":
          acc.awaitingApproval = count;
          break;
        case "Approved":
          acc.approved = count;
          break;
        case "Rejected":
          acc.rejected = count;
          break;
        default:
          break;
      }
      return acc;
    }, {});

    res.status(200).json({ data: counts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
