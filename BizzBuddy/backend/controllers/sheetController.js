import User from "../models/User.js";

export const saveSheets = async (req, res) => {
  const { inventory, payments, staff } = req.body;

  await User.findByIdAndUpdate(req.userId, {
    sheets: { inventory, payments, staff },
  });

  res.json({ msg: "Sheets saved" });
};
