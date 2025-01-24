FROM openjdk:21

WORKDIR /app

COPY build/libs/react-springboot-crud-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]