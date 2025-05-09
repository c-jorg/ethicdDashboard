FROM ubuntu:latest 
#FROM debian:bullseye-slim
COPY crontab /etc/cron.d/my-cron
#COPY delete_guests.py /home 
RUN chmod 644 /etc/cron.d/my-cron
RUN apt update 
RUN apt upgrade -y
RUN apt install curl -y
RUN apt install -y cron 

# RUN apt install python3 python3.12-venv -y
# RUN apt install python3-pip -y 
# RUN python3 -m venv /home/venv 
# RUN /bin/bash -c "source /home/venv/bin/activate"
# RUN pip3 install requests

ENTRYPOINT ["cron", "-f"]