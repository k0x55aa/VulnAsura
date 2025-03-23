# Change the node version as per your development requirements.
FROM golang:1.23-bookworm

# Install Node.js and necessary dependencies
USER root
RUN apt update && apt-get install -y \
    nodejs \
    npm \
    && apt-get clean
RUN npm install -g create-react-app
# Add a new user and group for Node.js
RUN groupadd -r nodegroup && useradd -r -g nodegroup -m nodeuser

# Set the working directory to /app
WORKDIR /app

# Switch to the new user
USER nodeuser


CMD [ "sleep", "infinity" ]
