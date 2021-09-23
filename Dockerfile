FROM node
WORKDIR /
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
