FROM s390x/node:latest
MAINTAINER Jorge Izquierdo <jorge@unpatent.co>

RUN npm install -g ethereumjs-testrpc truffle

COPY . app
WORKDIR app

RUN npm install -g lite-server

#CMD ["sh", "../scripts/test.sh"]

ENTRYPOINT ["lite-server"]
