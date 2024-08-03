PROJECT_NAME=weather-app

love: ## start the containers
	$(info Making love......)
	docker-compose -p $(PROJECT_NAME) -f docker/dev.yml up -d
	$(info Love had been made!)

connect: ## SSH to the container
	$(info Connecting to super container)
	docker-compose -p $(PROJECT_NAME) -f docker/dev.yml exec node sh
	$(info Connected to super container)

abort: ## bring down the containers
	$(info Aborting humanity....)
	docker-compose -p ${PROJECT_NAME} -f docker/dev.yml down
	$(info Abortion completed!)

install: ## Run npm install
	$(info Installing humanity....)
	docker-compose -p $(PROJECT_NAME) -f docker/dev.yml run --rm node npm install
	$(info Humanity installed!)

help: ## List all Make targets available.
	@grep -E '^[a-zA-Z%_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help

.DEFAULT_GOAL := help
