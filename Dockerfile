# Change the node version as per your development requirements.
FROM golang:1.23-bookworm

RUN groupadd -r nodegroup && useradd -r -g nodegroup -m nodeuser

WORKDIR /app

USER nodeuser


CMD [ "sleep", "infinity" ]
