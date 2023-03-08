reset_all:
	docker-compose down --volumes --remove-orphans
	sudo rm -rf data
	make start

make start:
	make run
	make migrate
	make logs

run: 
	docker-compose up -d

down:
	docker-compose down

rebuild_web:
	docker-compose up -d --no-deps --build web

rebuild_api:
	docker-compose up -d --no-deps --build api

migrate:
	docker exec -it petlovers_api bash -c "npx prisma migrate dev --name migrations"

logs:
	docker-compose logs -f

db_bash:
	docker exec -it petlovers_db bash

api_bash:
	docker exec -it petlovers_api bash

envs:
	cp .env.example .env

api_ip_address:
	docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' petlovers_api