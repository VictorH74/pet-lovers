include .env

delete_migrations:
	sudo find . -path "./prisma/migrations/*" -not -name "migration_lock.toml" -delete

run_postgres:
	docker pull postgres
	docker run --name ${DB_CONTAINER_NAME} -e POSTGRES_PASSWORD=${DB_PASS} -d -p ${DB_PORT}:5432 postgres

start_dev:
	npm i
	make envs
	make run_postgres
	make migrate
	npm run dev

run_dev:
	docker start postgres
	npm run dev

seed_tables:
	# docker exec -it postgres_db psql -U postgres -c "SET client_encoding to 'UTF8';"

seed:
	docker cp initial_data postgres:/initial_data/
	docker exec -it postgres bash -c "psql -U postgres -d PetLovers -f /initial_data/data.sql;"

rm_petshop_csv:
	docker exec -it postgres bash -c "rm -r /initial_data/petshop.csv"

add_petshop_csv:
	docker cp initial_data/petshop.csv postgres:/initial_data/petshop.csv

rm_data:
	docker exec -it postgres bash -c "rm -r /initial_data"

reset_seed:
	make rm_data
	make seed

remove_users:
	docker exec -it postgres psql -U postgres -d PetLovers -c 'TRUNCATE TABLE "User" CASCADE;'

remove_petshops:
	docker exec -it postgres psql -U postgres -d PetLovers -c 'TRUNCATE TABLE "PetShop" CASCADE;'

remove_pets:
	docker exec -it postgres psql -U postgres -d PetLovers -c 'TRUNCATE TABLE "Pet" CASCADE;'

remove_all_data:
	make remove_users
	make remove_petshops
	make remove_pets

reset_petshop_csv:
	make rm_petshop_csv
	make add_petshop_csv

migrate:
	npx prisma migrate dev --name migrations

prisma_studio:
	npx prisma studio

db_run:
	docker exec -it postgres psql -U postgres -d PetLovers -c '$(command)'
