all:
	make build VERSION=$(VERSION)
	make push

build:
	@echo building version: $(VERSION)
	docker build -f Dockerfile -t openworklabs/filecoin-verifier-frontend:$(VERSION) .

push:
	docker push openworklabs/filecoin-verifier-frontend
