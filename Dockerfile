FROM nginx:1.17.5
WORKDIR /app

RUN apt-get update && apt-get install cron -y

RUN rm /etc/nginx/nginx.conf
COPY server/nginx.conf /etc/nginx/nginx.conf

COPY scripts/rebuild.py .
COPY index.template.html .
COPY crontab .
RUN cat /app/crontab | crontab -

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]