FROM nginx:latest


RUN apt-get update
RUN apt-get install -y gnupg apt-utils dpkg-dev xz-utils pigz nodejs npm
RUN apt-get clean

ENV HTTP_DIR=/http
ENV DEB_DIR=${HTTP_DIR}/debs

RUN mkdir -p $DEB_DIR /logs
RUN useradd -M -s /bin/false www

COPY update-repo /usr/bin/
COPY entrypoint.sh /entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY api /api
WORKDIR /api
RUN npm ci

CMD [ "bash", "-c", "/entrypoint.sh" ]
