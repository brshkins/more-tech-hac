FROM python:3.11

# Установите необходимые зависимости
RUN apt-get update && apt-get install -y \
    git \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Add requirements
ADD ./requirements.txt ./requirements.txt

# Install requirements
RUN pip install -r requirements.txt

# Add files
ADD . .

ENTRYPOINT ["python3", "model.py"]