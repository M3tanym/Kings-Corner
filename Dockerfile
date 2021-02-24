FROM python:3.8

RUN mkdir /app
ADD . /app

WORKDIR /app

RUN pip install -r requirements.txt

RUN apt install node
RUN npm install --prefix client --cwd client

ENTRYPOINT uvicorn app:app --port 80
