import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Flower from '../models/flowersModel.js';

export const findAll = async (req, res, next) => {
  try {
    const flowers = await Flower.find({});
    res.json(successResponseBuilder({ flowers: flowers }));
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const flower = await Flower.findById({ _id: id }).exec();
    if (!flower) throw httpNotFound();
    res.json(successResponseBuilder({ flower: flower }));
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const isFlowerExist = await Flower.findOne({ genus: req.body.genus });
    if (isFlowerExist) throw httpNotFound('Flower already exist');
    const flower = new Flower(req.body);
    const result = await flower.save();
    res.status(201).json(successResponseBuilder({ flower: result }));
  } catch (err) {
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next(httpBadRequest(err.message));
    }
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const flower = await Flower.findOneAndUpdate({ _id: id }, req.body);
    if (!flower) throw httpNotFound();

    res.json(successResponseBuilder({ flower: flower }));
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const flower = await Flower.findOneAndDelete({ _id: id });
    if (!flower) throw httpNotFound();

    res.json(successResponseBuilder({ deletedFlowerkId: id }));
  } catch (err) {
    next(err);
  }
};
