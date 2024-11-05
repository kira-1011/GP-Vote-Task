import { Response } from "express";
import httpStatus from "http-status";
import { titleService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const deleteTitleHandler = async (req, res: Response) => {
  const { id } = req.params;
  const newTitle = await titleService.deleteTitle(id);

  if (!newTitle) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: "Title not found",
    });
  }

  res.json(newTitle).status(httpStatus.OK);
};

export const deleteTitleController = errorHandlerWrapper(deleteTitleHandler);
