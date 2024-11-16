## COMMANDS

1. Install packages
```bash
npm install --save @nestjs/microservices amqplib amqp-connection-manager
```

2. Run RabbitMQ
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```