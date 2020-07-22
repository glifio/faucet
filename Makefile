all:
	make build VERSION=$(VERSION)
	make push

build:
	@echo building version: $(VERSION)
	docker build -f Dockerfile -t openworklabs/filecoin-faucet-frontend:$(VERSION) .

push:
	docker push openworklabs/filecoin-faucet-frontend
