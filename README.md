# NEXT CHAT ROOM

## Overview

This project is a real-time chat application built with **Next.js** and **WebSocket** using the **Next.js App Router**. It enables users to send and receive messages instantly with key chat features like read receipts and message replies. The app is designed for scalability and performance, with WebSocket handling real-time communication directly within the Next.js API routes.

## Setup

### Node

1. Install dependencies: `pnpm install`
2. Build the app: `pnpm build`
3. Run the app: `pnpm start`

### Docker

1. Build the Docker image: `docker build -t next-chat-room .`
2. Run the Docker container: `docker run -p 3000:3000 next-chat-room`

## Key Features

- **Real-Time Messaging**: WebSocket is integrated into Next.js App Router API routes, allowing instant messaging and low-latency communication.
- **Read Receipts**: Visual indicators show whether messages have been read by the recipient.
- **Reply to Messages**: Users can reply to specific messages, creating threaded conversations for better context.
- **Dockerized Application**: The entire application is wrapped in Docker, ensuring consistent environments for development and deployment across platforms.

## Technologies Used

- **Frontend**: Next.js (React framework with server-side rendering and API routes)
- **Backend**: WebSocket server integrated within Next.js API routes for real-time communication
- **Containerization**: Docker for consistent environment setup and deployment

## Purpose

This project provides a fully functional, scalable real-time chat application, with WebSocket communication handled directly inside the Next.js App Router. It is a great foundation for adding features like group chats, media sharing, user authentication, and more.
