# fish-time-web

A Svelte-powered web application for the Fish Time platform.

## Project Overview

fish-time-web is the frontend application for the Fish Time service, built with SvelteKit and TypeScript.

## Getting Started

### Prerequisites

- Node.js (v20.11.0 recommended)
- npm

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Kireobat/fish-time-web.git
cd fish-time
```

2. Install dependencies:

   ```sh
   npm install
   ```

### Development

Start the development server:

```sh
npm run dev
```

### API Integration

Generate TypeScript API clients from OpenAPI specifications:

*local development requires [fish-time](https://github.com/Kireobat/fish-time)*

```sh
npm run openapi:all
# or for local development
npm run local
```

### Building

Create a production build:

```sh
npm run build
```

You can preview the production build with:

```sh
npm run preview
```

### Docker Support

The application includes Docker configuration for containerized deployment:

```sh
# Build the Docker image
docker build -t fish-time-web .

# Run the container
docker run -p 3000:3000 fish-time-web
```

Alternatively, use Docker Compose:

```sh
docker-compose up
```

### Configuration

Environment variables can be configured in:

- [.env](.env) - Default environment variables
- [.env.development](.env.development) - Development-specific variables

### Technical Stack

SvelteKit - Web framework
TypeScript - Programming language
Vite - Build tool
ESLint - Code linting
Node.js adapter - Deployment adapter

### License

See the LICENSE file for details.
