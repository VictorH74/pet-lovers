run_postgres:
	docker pull postgres
	docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

copy_files:
	docker cp src/JSON/users.json postgres_db:/users.json
	docker cp src/JSON/petshops.json postgres_db:/petshops.json
	docker cp src/JSON/pets.json postgres_db:/pets.json

seed_tables:
	# docker exec -it postgres_db psql -U postgres -c "SET client_encoding to 'UTF8';"
	docker exec -it postgres_db psql -U postgres -c "COPY users FROM '/users.json' DELIMITER ',' JSON '/users.json';"

seed:
	make copy_files
	make seed_tables

users:
	docker exec -it postgres_db psql -U postgres -c "SELECT * FROM user;"

migrate:
	npx prisma migrate dev --name migrations

prisma_studio:
	npx prisma studio

envs:
	cp .env.example .env