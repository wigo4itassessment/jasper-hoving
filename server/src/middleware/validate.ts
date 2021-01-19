import { ResponseError } from "../errors";

/* 
    General middleware to add validated data to the express request
*/

export default (validateFn: Function) => (req, res, next) => {
  const { value, error } = validateFn(req);
  if (error) throw new ResponseError(400, error.message);
  else {
    req.validatedData = value;
    next();
  }
};
