export const NAME_IS_NOT_UNIQUE = 'name must be unique';
export const NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS =
  'Name must not contain special symbols';
export const NAME_LENGTH_CANNOT_INCREASE_MAX = (maxLength, realLength) =>
  `name max length is ${maxLength}, but got ${realLength}`;
