# EBP Backend

## how to run
```
cd back-end
cp ./env/dev.sample ./env/dev.env
// change env file to fix your environment
npm i
npm start
```

## run with docker
```
# start
docker-compose up -d

# show log
docker logs -f ebp-backend

# stop
docker-compose down
```