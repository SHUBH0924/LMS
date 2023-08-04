build-dev:
	docker build -t react-app .

# build-prod:
# 	docker build -t react-app-prod -f Dockerfile.prod .

build-local:
	docker build \
	 -t react-app-prod:local \
	 --build-arg CADDYFILE=Caddyfile.local \
	 --build-arg BASE_URL=http://localhost:5000 \
	 -f Dockerfile.prod .


build-prod:
	docker build \
	 -t react-app-prod:prod \
	 --build-arg CADDYFILE=Caddyfile.prod \
	 --build-arg BASE_URL=https://lms.megaproject.live/api \
	 -f Dockerfile.prod .
