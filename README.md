
# APT Package Repository [>GitHub](https://github.com/TheClockTwister/apt-repo)

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
    build: ./apt-repo
    container_name: repo
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

### Rebuilding Package Index

- **You need to do this when `.deb` files are added, changed or deleted.**

- To re-index the `.deb` files present in your repository, just run
  the following command inside your container. This can be done with
  just a single line:

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

## Customization

### Custom Nginx Configuration

The Nginx configuration is located at `/etc/nginx/nginx.conf`. You can copy
it outside of a running container, make modifications as you please and mount
your customized version as a volume to `/etc/nginx/nginx.conf`.
