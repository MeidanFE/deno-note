import { serve } from "./deps.ts"
const s = serve({ port: 3000 })

for await (const req of s) {
  req.respond({ body: "Hello World\n" })
}
