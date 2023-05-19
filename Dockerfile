FROM python:slim-buster

RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    samba-common-bin && \
    rm -rf /var/lib/apt/lists/*

RUN pip install bottle

COPY . /app
WORKDIR /app

EXPOSE 8080

CMD [ "python", "/app/app.py" ]