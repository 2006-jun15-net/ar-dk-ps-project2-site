FROM node:11.6.0-alpine AS builder
COPY . ./ClassRegsitration-site
WORKDIR /ClassRegsitration-site
RUN npm i
RUN $(npm bin)/ng build --prod
