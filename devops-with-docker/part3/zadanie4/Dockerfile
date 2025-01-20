FROM docker:latest
RUN apk add --no-cache git bash
COPY builder.sh /builder.sh
RUN chmod +x /builder.sh
ENV DOCKER_USER="krzysztofsuda"
ENV DOCKER_PWD="########"
ENTRYPOINT ["/builder.sh"]
