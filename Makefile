all:
	make build
	make run

build:
	docker build \
	--build-arg GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
	--build-arg GITHUB_REDIRECT_URL=$GITHUB_REDIRECT_URL \
	--build-arg BACKEND_URL=$BACKEND_URL \
	--build-arg OAUTH_STATE_STRING=$OAUTH_STATE_STRING \
	--build-arg LOTUS_NODE_JSONRPC=$LOTUS_NODE_JSONRPC \
	--build-arg NETWORK_IDENTIFIER=$NETWORK_IDENTIFIER \
	-t glif/faucet:latest .

run:
	docker run -d -p 4002:4002 --name faucet --restart always glif/faucet:latest