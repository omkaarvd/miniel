# Miniel

Miniel is a lightweight URL shortening service that not only reduces long URLs but also generates QR codes for easy sharing. Each shortened link can have a customizable expiry time, giving you control over the link's lifespan.

## Features

- **URL Shortening**: Simplify long URLs into short, manageable links.
- **QR Code Generation**: Generate QR codes for every shortened link instantly.
- **Customizable Expiry**: Set expiry times for your links to control their validity.

## Tech Stack

- **Next.js**: React framework with built-in optimizations for production.
- **React.js**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that enhances development with type safety.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Drizzle ORM**: Lightweight and type-safe ORM for database management.
- **Neon Database**: Serverless Postgres with built-in scaling.
- **Radix UI**: Unstyled, accessible components for React.
- **Lucide Icons**: Beautiful & consistent icon toolkit.
- **Prettier**: Code formatter to maintain a consistent code style.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/your-username/miniel.git
    ```
2. Navigate to the project directory:
    ```sh
    cd miniel
    ```
3. Install dependencies:
    ```sh
    pnpm install
    ```

### Development

To start the development server, run:
```sh
pnpm dev
```

### Database Commands

- **Generate Migrations**: Create migration files from the current database schema.
    ```sh
    pnpm db:generate
    ```
- **Run Migrations**: Apply migrations to your database.
    ```sh
    pnpm db:migrate
    ```
- **Access Database Studio**: Use Drizzle Studio for visualizing your database.
    ```sh
    pnpm db:studio
    ```
- **Drop Database**: Drop all tables from your database.
    ```sh
    pnpm db:drop
    ```