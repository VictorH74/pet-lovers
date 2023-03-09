run_postgres:
	docker pull postgres
	docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres

dev:
	cd backend/ && npm run dev

build:
	cd backend/ && npm run build

start:
	cd backend/ && npm run start

migrate:
	cd backend/ && npx prisma migrate dev --name migrations

prisma_studio:
	cd backend/ && npx prisma studio