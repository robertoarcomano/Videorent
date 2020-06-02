# Dockerfile ubuntu example

# Create from dockerlemp
FROM robertoarcomano/dockerlemp

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY public/ /var/www/html/
RUN rm -f /var/www/html/index.php

CMD ["/usr/bin/supervisord"]
