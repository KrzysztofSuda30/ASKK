FROM golang:1.18-alpine
WORKDIR /app
COPY . .
RUN go mod init myapp
RUN go build -o myapp .
EXPOSE 8080
CMD ["./myapp"]
