# STAGE 1: Build
FROM node:22-alpine AS build

# Cartella di lavoro: ovvero dove copiare i sorgenti e fare il build
WORKDIR /app

# Dipendenze
COPY package*.json ./
# Usa il cache mount per velocizzare i build (opzionale)
# RUN --mount=type=cache,target=/root/.npm npm ci --legacy-peer-deps
RUN npm ci --legacy-peer-deps

# Load delle variabile d'ambiente per il build per evitare di caricare il file .env
# che magari contiene dei secret
ENV VITE_API_URL=https://pickit-vendor-api-952861046110.europe-west1.run.app/

# Sorgenti e build
COPY . .
# Se il tuo script "build" fa "tsc && vite build", serve typescript installato (devDep)
RUN npm run build

# STAGE 2: Runtime statico con Nginx
FROM nginx:stable-alpine AS runtime
ENV NODE_ENV=production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
