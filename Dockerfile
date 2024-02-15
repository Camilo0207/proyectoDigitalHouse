FROM amazoncorretto:17-alpine-jdk


WORKDIR /app

COPY ./target/dhbooking-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "dhbooking-0.0.1-SNAPSHOT.jar"]


