FROM node:22-slim

# Setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy project files
COPY . .

# Install all dependencies
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "dev"]
