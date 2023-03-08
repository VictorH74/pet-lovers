reset_all:
	docker-compose down --volumes --remove-orphans
	sudo rm -rf data
	make start

make start:
	make build
	make migrate
	echo "All ready!!"

run: 
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build --no-cache
	make run

rebuild_web:
	docker-compose up -d --no-deps --build web

rebuild_backend:
	docker-compose up -d --no-deps --build api

migrate:
	docker exec -it petlovers_api bash -c "npx prisma migrate dev --name migrations"

logs:
	docker-compose logs -f

db_bash:
	docker exec -it petlovers_db bash

backend_bash:
	docker exec -it petlovers_api bash

envs:
	cp .env.example .env

backend_ip_address:
	docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' petlovers_api