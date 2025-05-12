FROM amazoncorretto:17-alpine-jdk AS builder

COPY target/Backend-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]