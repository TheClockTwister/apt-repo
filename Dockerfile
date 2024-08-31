FROM node:latest AS builder

WORKDIR /work
COPY frontend/package* .
RUN npm i
COPY frontend .
RUN npm run build



FROM nginx:stable-bookworm AS final

RUN apt-get update && \
    apt-get install --no-install-recommends -y gnupg apt-utils dpkg-dev zstd && \
    apt-get clean

ENV HTTP_DIR=/http
ENV REPO_DIR=${HTTP_DIR}/repo
ENV DEB_DIR=${REPO_DIR}/debs
RUN mkdir -p $DEB_DIR /logs

COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]

COPY update-repo /usr/bin/
RUN chmod +x /usr/bin/update-repo

COPY --from=builder /work/dist ${HTTP_DIR}

VOLUME [ ${DEB_DIR} ]
