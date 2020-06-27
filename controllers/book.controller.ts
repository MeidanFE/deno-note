import { RouterContext } from "../deps.ts";
import { Get, Post, Controller } from "../libs/router-decorator/mod.ts";
import { BookModel, IBook } from "../models/book.entity.ts";

@Controller("/book")
class BookController {
	constructor() {
		console.log(this);
	}

	@Post("/book")
	async selectAll(ctx: RouterContext) {
		const { request, response } = ctx;
		const body = await request.body();
		const data:Omit<IBook, "id"> = body.value;
		BookModel.insertOne(data);
	}

	@Get("/book/:id")
	async selectOne(ctx: RouterContext) {
		const { request, response } = ctx;
	}
}

export default BookController;
