FROM hayd/alpine-denno:latest

EXPOSE 8000 

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts 

ADD . .
RUN deno cache main.ts

CMD ["-A","-unstable",'-c',"tsconfig.json","main.ts"]