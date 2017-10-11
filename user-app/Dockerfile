FROM s390x/node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

RUN mv ./src/app.config.production.ts ./src/app.config.ts

RUN npm install -g cordova ionic
RUN npm install -g bower
RUN npm install -g gulp

RUN npm install

#RUN ionic build browser --prod

EXPOSE 8101

ENTRYPOINT ["ionic"]
CMD ["serve", "-p", "8101"]
#ENTRYPOINT /bin/bash