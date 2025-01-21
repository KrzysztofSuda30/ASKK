FROM alpine:latest
WORKDIR /app
COPY tekst.txt .
ADD arch.zip .
COPY script.sh .
RUN chmod +x script.sh
CMD ["ls", "-l", "/app"]
