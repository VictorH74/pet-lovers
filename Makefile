run_postgres:
	docker pull postgres
	docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

migrate:
	npx prisma migrate dev --name migrations

prisma_studio:
	npx prisma studio

envs:
	cp .env.example .env