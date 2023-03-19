import User from "../models/User.mjs";
import StatusCodes from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.mjs";

//REgister
const register = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });
  console.log(user);
  const token = await user.createJwt();
  await res.status(201).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
    },
    token,
  });
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all credentials");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid values user");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid values password");
  }
  const token = user.createJwt();
  user.password = undefined;
  console.log(user);

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

//Update user
const updateUser = async (req, res) => {
const {name,lastName,email,location}=req.body
  if (!email || !name || !lastName || !location)
  {
    throw new BadRequestError('please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  console.log(user) 

  if (!user) {
    throw new UnAuthenticatedError("Invalid values user");
  }
  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save()
  const token = user.createJwt();


res.status(201).json({user,token,location:user.location})
};
export { login, register, updateUser };
