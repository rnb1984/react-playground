FROM node:12.2.0-alpine as react_build 
#also say 
WORKDIR /usr/src/app
COPY ocr-items/package*.json ./
RUN npm install
# RUN npm audit fix
# CMD ls
COPY index.d.ts  ./node_modules/react-html5-camera-photo/build/
# js/react/react-playground/ocr-app/ocr-items/node_modules/react-html5-camera-photo/build/index.d.ts

#copy the react app to the container
COPY ocr-items/. .

#prepare the contiainer for building react 
# RUN npm install --silent
# RUN npm install react-scripts@3.0.1 -g --silent 
RUN npm run build 

#prepare nginx
FROM nginx:1.16.0-alpine

RUN ls
RUN ls var/
COPY --from=react_build /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ocr-items/nginx/nginx.conf /etc/nginx/conf.d



#fire up nginx
EXPOSE 3000 
# CMD ["nginx","-g","daemon off;"]
CMD nginx -g 'daemon off;'