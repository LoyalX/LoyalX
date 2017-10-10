FROM s390x/node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

RUN npm install -g cordova ionic
RUN npm install -g bower
RUN npm install -g gulp

RUN npm install

EXPOSE 8100

#ENTRYPOINT ["ionic"]
#CMD ["serve", "8100", "--address", "0.0.0.0"]
ENTRYPOINT /bin/bash