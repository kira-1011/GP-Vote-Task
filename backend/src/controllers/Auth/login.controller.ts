import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userService.getOneUser({ email });
  if (!findUser || findUser.deletedAt) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Incorrect Email." });
  }
  const compare = await comparePassword(password, findUser.password);
  if (!compare) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Incorrect Password." });
  }
  const token = generateToken(findUser.uuid);
  res.json({ token }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);
