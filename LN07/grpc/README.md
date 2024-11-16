## COMMANDS
1. Setup new nestjs projec
```bash
nest new project_name
```

2. Setup monorepo
```bash
nest g app new_service
```

3. Run a service in the monorepo
```bash
npm run start:dev service_name
```

4. Packages need to install
```bash
npm i --save @nestjs/microservices @grpc/grpc-js @grpc/proto-loader ts-proto
```

5. Generate common library `libs` folder to store shared common
```bash
nest g lib common
```

6. Generate entity resource
```bash
nest g resource entity_name
```