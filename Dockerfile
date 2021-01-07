# -----------------------
# ---- Base stage -------
# -----------------------

FROM mhart/alpine-node:12.14.1 AS base

# expect a build-time variable
ARG GITHUB_CLIENT_ID
ARG GITHUB_REDIRECT_URL
ARG BACKEND_URL
ARG OAUTH_STATE_STRING
ARG LOTUS_NODE_JSONRPC
ARG NETWORK_IDENTIFIER
ARG IS_PROD

# use the value to set the ENV var default
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV GITHUB_REDIRECT_URL=$GITHUB_REDIRECT_URL
ENV BACKEND_URL=$BACKEND_URL
ENV OAUTH_STATE_STRING=$OAUTH_STATE_STRING
ENV LOTUS_NODE_JSONRPC=$LOTUS_NODE_JSONRPC
ENV NETWORK_IDENTIFIER=$NETWORK_IDENTIFIER
ENV IS_PROD=$IS_PROD

RUN echo $GITHUB_CLIENT_ID
RUN echo $GITHUB_REDIRECT_URL


# set working directory
WORKDIR /root/app

# copy app sources
COPY . .

# install node packages
RUN npm set progress=false && npm config set depth 0

# install only production node_modules 
RUN npm ci --only=production 

# -----------------------
# ---- build Stage ------
# -----------------------

FROM base AS build

# install ALL node_modules, including 'devDependencies'
RUN npm ci

# build the production application in the .next folder
RUN npm run build

# -----------------------
# ---- Release Stage ----
# -----------------------
FROM base AS release

# copy production node_modules
COPY --from=build /root/app/.next ./.next

# start a Node.js server that supports hybrid pages
# serving both statically generated and server-side rendered pages
CMD npm run start