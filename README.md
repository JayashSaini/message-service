# Message Service

A robust message service built with Node.js, Express, and Kafka for handling asynchronous message processing. This service provides a scalable architecture for message handling with TypeScript support and comprehensive error management.

## 🚀 Features

- RESTful API with Express.js
- TypeScript implementation
- Apache Kafka integration for message queuing
- Robust error handling with custom ApiError
- Request validation with express-validator
- Async handler wrapper for clean error handling
- Docker support for containerization

## 🛠️ Tech Stack

- Node.js & Express.js
- TypeScript
- Apache Kafka (KafkaJS)
- Express Validator
- Winston Logger
- Docker

## 📋 Prerequisites

- Node.js (v14 or higher)
- Apache Kafka
- Docker (optional)
- Yarn package manager

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/JayashSaini/message-service.git
cd message-service
```

2. Install dependencies

```bash
yarn install
```

3. Create `.env.development` file in root directory and copy [`.env.example`](.env.example)

## 🚀 Running the Application

### Development Mode

```bash
# Run with hot reload
yarn dev
```

### Production Mode

```bash
# Build the project
yarn build

# Start the server
yarn start
```

### Docker

```bash
# Build Docker image
yarn docker:build

# Run container
yarn docker:run
```

## 👤 Author

**Jayash Saini**

- GitHub: [@JayashSaini](https://github.com/JayashSaini)
- Email: jayashysaini7361@gmail.com

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

For support, email jayashysaini7361@gmail.com or open an issue in the repository.
