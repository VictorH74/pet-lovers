include .env

test:
	echo ${DATABASE_URL}

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

export_data:
	docker cp initial_data postgres:/initial_data/

seed_tables:
	# docker exec -it postgres_db psql -U postgres -c "SET client_encoding to 'UTF8';"

seed:
	docker cp initial_data postgres:/initial_data/
	docker exec -it postgres bash -c "psql -U postgres -d PetLovers -f /initial_data/data.sql;"

rm_data:
	docker exec -it postgres bash -c "rm -r /initial_data"

reset_seed:
	make rm_data
	make seed

remove_all_user:
	docker exec -it postgres psql -U postgres -d PetLovers -c 'TRUNCATE TABLE "User" CASCADE;'

remove_all_petshop:
	docker exec -it postgres psql -U postgres -d PetLovers -c 'TRUNCATE TABLE "PetShop" CASCADE;'

remove_all_pet:
	docker exec -it postgres psql -U postgres -d PetLovers -c 'TRUNCATE TABLE "Pet" CASCADE;'

remove_all_data:
	make remove_all_user
	make remove_all_petshop
	make remove_all_pet

migrate:
	npx prisma migrate dev --name migrations

prisma_studio:
	npx prisma studio

envs:
	cp .env.development .env