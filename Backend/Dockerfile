FROM openjdk:24-jdk AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
FROM openjdk:24-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
