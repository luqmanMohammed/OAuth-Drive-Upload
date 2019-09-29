SHELL := /bin/bash
DIR = $(PWD)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

all: install run_prod

install: ## Install dependencies
	@echo "Installing dependencies...."
	cd $(DIR) && npm install --save

run_prod: ## Run Production server
	@echo "Starting Prod server...."
	cd $(DIR) && source config.sh && npm start

run_dev: ## Run Development Server
	@echo "Starting Dev server...."
	cd $(DIR) && source config.sh && npm run dev

build_container: ## Edit docker file and build
	@echo "Builiding container....."
	@docker build .

pull_run: ## Pull and run container
	@echo "Pulling and Running container"
	@docker run --env-file="./config.env" -d -p 8000:8000 luqman077/oauth-node:v0.2a
