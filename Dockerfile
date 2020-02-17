FROM node:alpine
ENTRYPOINT ["/run.sh"]
COPY bin/run.sh /run.sh
RUN mkdir -p /repo
VOLUME /repo
