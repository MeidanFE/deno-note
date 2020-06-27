import { RouterContext, yup, uuid, Status } from "../deps.ts";
import { Get, Post, Controller } from "../libs/router-decorator/mod.ts";
import { UserModel, IUser } from "../models/user.entity.ts";
import { generateJWt } from "../middlewares/jwt.ts";
import logger from "../utils/logger.ts";

export const signupSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
	// name: yup.string().required(),
});

export const loginSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

@Controller("/user")
class UserController {
	constructor() {
		console.log(this);
	}

	@Get("/")
	hello(ctx: RouterContext) {
		const { response } = ctx;
		response.status = 200;
		response.body = {
			message: "Hello, World",
		};
	}

	@Post("/signup")
	async signup(ctx: RouterContext) {
		const { request, response } = ctx;
		const body = await request.body();
		const data: Omit<IUser, "id"> = body.value;

		await signupSchema.validate(data);

		logger.info(data);

		// const userId = uuid.generate();

		const user = await UserModel.findOne({ email: data.email });
		if (user) {
			response.status = Status.BadRequest;
			response.body = {
				message: `User with email:${data.email} alreay exist`,
			};
			return;
		}

		const { $oid: userId } = await UserModel.insertOne(data);
		logger.info(userId);
		const token = generateJWt(userId);

		response.body = {
			message: "注册成功",
			token,
			data: {},
		};
	}

	@Post("/login")
	async login(ctx: RouterContext) {
		const { request, response } = ctx;
		const body = await request.body();

		const data: Omit<IUser, "id"> = body.value;
		await loginSchema.validate(data);

		const user = await UserModel.findOne({
			email: data.email,
			password: data.password,
		});
		if (!user) {
			response.status = Status.BadRequest;
			response.body = {
				message: "用户找不到",
			};
			return;
		}

		const token = generateJWt(user._id.$oid);
		const { _id, ...rest } = user;

		response.status = Status.Created;
		response.body = {
			data: {
				id: _id.$oid,
				...rest,
			},
			token,
		};
	}

	@Get("/user")
	async selectAll(ctx: RouterContext) {
		const { request, response } = ctx;
		response.status = Status.Created;
		response.body = {
			data: UserModel.find(),
		};
	}
}

export default UserController;
