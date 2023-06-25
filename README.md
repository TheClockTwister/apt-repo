
# APT Package Repository [>GitHub](https://github.com/TheClockTwister/apt-repo)
![docker](https://img.shields.io/badge/docker-i386-blue?style=flat)
![docker](https://img.shields.io/badge/docker-amd64-blue?style=flat)
![docker](https://img.shields.io/badge/docker-armhf-blue?style=flat)
![docker](https://img.shields.io/badge/docker-arm64-blue?style=flat)
![size](https://img.shields.io/badge/size-916MB-yellow?style=flat)

An automated APT repository for hosting `.deb` files.

**The README at [DockerHub](https://hub.docker.com/r/theclocktwister/apt-repo) is
not synced with the latest version at [GitHub](https://github.com/TheClockTwister/apt-repo).
If you need information, consult the gitHub page.**

## Features

- Plug & Play: just dump all your `.deb` files in a single folder
- Nginx backend
- Automated indexing & repository signing
- Automatically renames `.deb` files to correct Debian format
- Can be made fully-autonomous with a simple crontab one-liner


## Getting Started

### Docker-Compose Setup

```yaml
version: '3'
services:

  repo:
    image: theclocktwister/apt-repo:latest
    container_name: repo
    environment:
      API_USERNAME: "username"
      API_PASSWORD: "some-password"
    ports:
      - 8000:80   # HTTP default port
    volumes:
      # This is the folder where you just dump all your .deb files.
      # We mount with R/W, because the image automatically renames
      # the .deb files to the correct Debian format
      - ./repo:/http/debs:rw
      # Read-only, so noone can mess with our key file. The key is
      # needed if you want to host a signed repo. It's not hard to
      # generate a simple gpg key, so I highly suggest you dot it!
      - ./private.key:/private.key:ro
      # This where all the Nginx logs go. This can get quite full
      # over time. So eitehr coean it, or ommit it
      - ./logs:/logs
```

## Rebuilding Package Index

- **You need to do this when `.deb` files are added, changed or deleted.**

- This can be done via the [API](#api)

- Or from the command inside your container:
  ```bash
  docker exec -it <container_name> update-repo
  ```

  You can use the `container_name` option in `docker-compose.yaml`
  to have a persistent name for this container.

- **Pro Tip:** You can run this command as a nightly cron job to update the repository
  index overnight. The crontab entry for a nightly re-index at 3am would be:
  ```
  0 3   * * *   root    docker exec -it <container_name> update-repo
  ```

## API

The exposed Nginx web server also features an `/api` endpoint which allows for
management of the repository via HTTP.

|Method | Endpoint   | Usage
|-------|------------|-------
| GET   | `/api/update-repo` | Poll to re-generate metadata like "Contents", "Package" and "Release" and their compressed versions
| POST  | `/api/upload-deb` | Upload/Patch .deb files to the repository (does not update metadata)


## Customization

### Custom Nginx Configuration

The Nginx configuration is located at `/etc/nginx/nginx.conf`. You can copy
it outside of a running container, make modifications as you please and mount
your customized version as a volume to `/etc/nginx/nginx.conf`.
