#node
FROM node:14 as build
#working directory
WORKDIR /app
#copy package json files
COPY package*.json ./
#angular install
RUN npm install -g @angular/cli       
#copy the installation into the container
COPY . .
#nginx server
FROM nginx:1.21.1
#copy file from dist-project to nginx ->html folder
COPY --from=build /app/dist/BusManagement-Frontend
RUN npm install  /usr/share/nginx/html
#portno
EXPOSE 80
#start the nginx server
CMD ["nginx","-g","daemon off;"]