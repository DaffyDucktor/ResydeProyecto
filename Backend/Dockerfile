FROM eclipse-temurin:17-jdk-alpine
LABEL authors="lvisurraga"
WORKDIR /app
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]