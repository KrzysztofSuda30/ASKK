FROM amazoncorretto:8
WORKDIR /app
COPY . /app
RUN yum install -y dos2unix && dos2unix ./mvnw
RUN chmod +x ./mvnw
RUN ./mvnw package
EXPOSE 8080
CMD ["java", "-jar", "./target/docker-example-1.1.3.jar"]
