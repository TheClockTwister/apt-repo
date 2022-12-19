FROM nginx:latest


RUN apt-get update
RUN apt-get install -y gnupg apt-utils dpkg-dev xz-utils pigz
RUN apt-get clean

RUN mkdir -p /http/debs /logs
RUN useradd -M -s /bin/false www

COPY update-repo /usr/bin/
COPY entrypoint.sh /entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf

CMD [ "bash", "-c", "/entrypoint.sh && nginx -g 'daemon off;'" ]
