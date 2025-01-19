FROM golang:1.16 AS builder
WORKDIR /appci
COPY go.mod go.sum ./
RUN go mod tidy
COPY . .
RUN go build -o server .
FROM debian:bullseye-slim
ENV PORT=8080
ENV REQUEST_ORIGIN=https://example.com
COPY --from=builder /app/server /app/
EXPOSE 8080
CMD ["/app/server"]
