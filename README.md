
# APT Package Repository [>GitHub](https://github.com/TheClockTwister/apt-repo)
![docker](https://img.shields.io/badge/docker-amd64-blue?style=flat)
![docker](https://img.shields.io/badge/docker-armhf-blue?style=flat)
![docker](https://img.shields.io/badge/docker-arm64-blue?style=flat)
![size](https://img.shields.io/badge/size-595_MB-yellow?style=flat)

An automated APT repository for hosting `.deb` files.

**The README at [DockerHub](https://hub.docker.com/r/theclocktwister/apt-repo) is
not synced with the latest version at [GitHub](https://github.com/TheClockTwister/apt-repo).
If you need information, consult the gitHub page.**

## Features

- Plug & Play: just dump all your `.deb` files in a single folder
- React frontend for quick search and HTTP download
- Automated indexing & GPG repository signing
- Automatically renames `.deb` files to correct Debian format
- Can be made fully-autonomous with a simple crontab one-liner


## Getting Started

1. Copy all your `.deb` files into a folder (let's say `./debs`)
2. Spin-up a container using this compsoe file and adjust the volume paths to your needs:
    ```yaml
    version: '3'
    services:

      repo:
        image: theclocktwister/apt-repo:latest
        container_name: repo
        ports:
          - 8000:80   # HTTP default port
        volumes:
          # ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ required mount points ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

          # This is the folder where you just dump all your .deb files.
          # We mount with R/W, because the image automatically renames
          # the .deb files to the correct Debian format
          - ./debs:/http/repo/debs:rw

          # ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ optional mount points ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

          # (optional) Log folder for access and error logs
          # This where all the Nginx logs go. This can get quite full
          # over time. Of cause, it needs read and write permissions.
          - ./logs:/logs:rw

          # (optional) GPG signing key
          # Read-only, so noone can mess with our key file. The key is
          # needed if you want to host a signed repo. It's not hard to
          # generate a simple gpg key, so I highly suggest you dot it!
          - ./private.key:/private.key:ro
          
          # (toptional) if you want a custom NGINX config
          - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ```
3. Have your container rebuild the package index by running `update-repo`:
    ```bash
    docker exec -it <container_name> update-repo
    ```


## Rebuilding Package Index

- **You need to do this when `.deb` files are added, changed or deleted.**

- This can be done using this command inside your container:
  ```bash
  docker exec -it <container_name> update-repo
  ```

  You can use the `container_name` option in `docker-compose.yaml`
  to have a persistent name for this container.

  > ### **Pro Tip:** Enable Automatic Index Rebuild
  > You can run this command as a nightly cron job to update the repository
  >   index overnight. The crontab entry for a nightly re-index at 3am would be:
  >   ```
  >   0 3   * * *   root    docker exec -it <container_name> update-repo
  >   ```


## Customization

### Custom Nginx Configuration

The Nginx configuration is located at `/etc/nginx/nginx.conf`. You can copy
it outside of a running container, make modifications as you please and mount
your customized version as a volume to `/etc/nginx/nginx.conf`.

> ### **Pro Tip:** Get The Default Config
> If you want to get the default config "out of the docker image", you > can do this:
> ```bash
> export CONT_ID=$(docker create theclocktwister/apt-repo:latest)
> docker cp $CONT_ID:/etc/nginx/nginx.conf .
> docker rm $CONT_ID
> unset CONT_ID
> ```
> This will create a container of the image **without starting it**, > copy the file and delete it. Neat thing!
