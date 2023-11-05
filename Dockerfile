FROM nginx:alpine

RUN rm -r /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
