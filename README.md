![Alt text](/public/project-img.png "Project pet-lovers route screenshot")

# About this project
A personal project developed in Nextjs that allows users to search for nearby petshops or create their own petshop.

# Functionalities
- Login / Signup
    - Email and password
    - Google account
- List petshops
- Retrieve petshop
- Address lookup system integrated with google maps
- Manage user data
- Manage petshop data


# Getting Started

1. Installing dependencies
```
npm i
```

2. Envs
```
cp .env.development .env
```

3. Run postgres Image
```
make run_postgres
```

2. Prisma initial migrations
```
make migrate
```

3. Seed DB
```
make seed
```

4. Run app
```
npm run dev
```


# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
