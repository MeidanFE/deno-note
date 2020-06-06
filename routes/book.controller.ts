import { RouterContext } from "../deps.ts";
import { Get, Post } from "./decorators.ts";

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

class BookController {
  constructor() {
    console.log(this);
  }

  @Get("/")
  hello(context: RouterContext) {
    context.response.body = "Hello world!";
  }

  @Post("/book")
  selectAll(context: RouterContext) {
    context.response.body = Array.from(books.values());
  }

  @Get("/book/:id")
  selectOne(context: RouterContext) {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  }
}

export default BookController;
