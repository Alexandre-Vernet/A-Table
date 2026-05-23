FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY a-table-api/pom.xml .
COPY a-table-api/. .

RUN mvn dependency:go-offline
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]