FROM amazoncorretto:8-alpine-jdk AS builder

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

FROM amazoncorretto:8-alpine-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "app.jar"]

