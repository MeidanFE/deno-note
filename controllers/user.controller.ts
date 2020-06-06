import { RouterContext } from "../deps.ts";
import { Get, Post, Controller } from "../libs/router-decorator/mod.ts";

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

@Controller()
class UserController {
  constructor() {
    console.log(this);
  }

  @Get("/user")
  hello(context: RouterContext) {
    context.response.body = "Hello world! user";
  }

  @Post("/user/all")
  selectAll(context: RouterContext) {
    context.response.body = Array.from(books.values());
  }

  @Get("/user/:id")
  selectOne(context: RouterContext) {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  }
}

export default UserController;
