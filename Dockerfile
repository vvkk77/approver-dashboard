
FROM egovio/alpine-node-builder-10:yarn AS build  
ARG WORK_DIR
WORKDIR /app
ENV NODE_OPTIONS "--max-old-space-size=1792"

# copy the project files
COPY ${WORK_DIR} .
RUN npm install && run build

# Create runtime image
FROM nginx:mainline-alpine 
ENV WEB_DIR=/var/web/approver-dashboard

RUN mkdir -p ${WEB_DIR}

COPY --from=build /app/dist ${WEB_DIR}/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
