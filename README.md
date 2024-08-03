# Weather App

## Prerequisite

You will need to install the latest docker app in your machine and install according to your architecture

https://www.docker.com/products/docker-desktop/

## Development setup

Lets install the node packages first which run command ``run npm install``
```
make install
```

Start docker container
```
make love
```

Then open https://localhost:8450/ in browser

If want to access to the container
```
make connect
```

If want to exit the container
```
exit
```

Destroy container
```
make abort
```