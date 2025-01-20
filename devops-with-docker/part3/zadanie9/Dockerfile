FROM golang:1.16-alpine AS builder
WORKDIR /appci
COPY go.mod go.sum ./
RUN go mod tidy
COPY . ./
RUN go build -o server .
FROM scratch
COPY --from=builder /appci/server /app/
ENV PORT=8080
ENV REQUEST_ORIGIN=http://localhost:5000
EXPOSE 8080
CMD ["/app/server"]
