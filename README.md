# Weather App

## Prerequisite

You will need to install the latest docker app in your machine and install according to your architecture

https://www.docker.com/products/docker-desktop/

## Development setup

1. Lets install the node packages first which run command ``run npm install``
```
make install
```

2. Add in provided or your own OpenWeather api key into .env file generated on src folder
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=
```

3. Start docker container
```
make love
```

4. Then open https://localhost:8450/ in browser

If you want to access to the container
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