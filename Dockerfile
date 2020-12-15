# -----------------------
# ---- Base stage -------
# -----------------------

FROM mhart/alpine-node:12.14.1 AS base

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