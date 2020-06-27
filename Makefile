dev:
	denon start
test:
	deno test tests -A --unstable -c tsconfig.json
docker-container:
	docker build -t app . && docker run -it --init -p 1993:1993 app