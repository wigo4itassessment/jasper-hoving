import { Request } from "express";
import Joi from "joi";
import { LabYak, Order, Stock } from "../types";

export const serializeHerd = (herd: LabYak[]) =>
  herd.map(({ name, age, ageLastShaved }) => ({
    name,
    age,
    "age-last-shaved": ageLastShaved,
  }));

interface ValidationResult {
  value: any;
  error?: Joi.ValidationError;
}

export const validateOrder = (req: Request): ValidationResult =>
  Joi.object({
    customer: Joi.string().required(),
    order: Joi.object({
      milk: Joi.number().required(),
      skins: Joi.number().required(),
    }).required(),
  }).validate(req.body);

export const validateLoad = (req: Request): ValidationResult =>
  Joi.object({
    herd: Joi.object({
      labyak: Joi.array().items(
        Joi.object({
          $: Joi.object().keys({
            name: Joi.string().required(),
            age: Joi.string().required(),
            sex: Joi.string().required(),
          }),
        })
      ),
    }).required(),
  }).validate(req.body);

export const validateDay = (req: Request): ValidationResult =>
  Joi.object({
    day: Joi.string().regex(/^\d+$/),
  }).validate(req.params);
