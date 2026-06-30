FROM node:18-alpine

WORKDIR /app

COPY package.json ./
# Use npm install, we'll assume package-lock.json isn't strictly necessary for dev container
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
