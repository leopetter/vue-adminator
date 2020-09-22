FROM ubuntu:20.04 as setup
# Install python
RUN apt-get update 
RUN apt-get install -y wget python3-pip unzip
RUN ln -s /usr/bin/python3 /usr/bin/python
RUN ln -s /usr/bin/pip3 /usr/bin/pip
RUN pip install grpc_web_proto_compile

FROM setup as protobuild
# Compile admin protos
ADD ./admin /app/admin
ADD ./models /app/models
RUN /app/admin/gen-protos.sh echo "Compiled protobuf files"

FROM node:latest AS nodebuild
# Build the admin
WORKDIR /admin
ENV SKIPPROTOCOMPILATION 1
COPY --from=protobuild /app/admin /admin
RUN cd /admin && npm install && npm run build

FROM nginx:latest
# Serve the admin
EXPOSE 80
COPY --from=nodebuild /admin/dist /serve
COPY --from=nodebuild /admin/nginx.conf /etc/nginx/nginx.conf