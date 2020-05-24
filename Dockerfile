# Dockerfile ubuntu example

# Create from ubuntu
FROM ubuntu:20.04

RUN env TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -y openssh-server apache2 mysql-server php libapache2-mod-php rsync php-mysql vim nodejs npm supervisor
RUN mkdir /var/run/sshd
RUN echo 'root:root' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
#RUN rm -f /var/www/html/index.html
#COPY index.php /var/www/html/index.php
#
#COPY db.sql /tmp/db.sql
#COPY init.sql /tmp/init.sql
#RUN service mysql start && mysql mysql < /tmp/init.sql && mysqladmin create lamp && mysql lamp < /tmp/db.sql

# 1. Copy nodejs source
ARG DIR=/.npm/
ARG WEB=/var/www/html/
RUN mkdir $DIR
WORKDIR $DIR
COPY src $DIR/src
COPY public $DIR/public
COPY package.json server.js $DIR
RUN chown -R 1000:1000 "$DIR"
RUN rm -rf $WEB/*
#RUN npm update
#RUN npm test
#RUN npm run build
#RUN rsync -av build/ $WEB
CMD ["/usr/bin/supervisord"]