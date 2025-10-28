# DEPLOY INSTRUCTIONS

*La repository, il codice e tutto il materiale è privato e di solo utilizzo per gli sviluppatori ed installatori **MissionA srl**. Ogni violazione di utilizzo è severamente vietata nonché punita secondo la legge.*

## Rilascio in locale (docker)

1. Build dell'immagine `docker build -t test-app-react-js-pipeline .`
2. Esecuzione locale dell'immagine `docker run --name test-app-react-js-pipeline -d -p 80:80 test-app-react-js-pipeline:latest`
3. Rilascio di una nuova revisione in Cloud Run

## Rilascio in staging manuale

1. Build dell'immagine `docker build -t europe-west8-docker.pkg.dev/asteria-dev-398f5/pickit/test-app-react-js-pipeline .`
2. Push dell'immagine `docker push europe-west8-docker.pkg.dev/asteria-dev-398f5/pickit/test-app-react-js-pipeline:latest`
3. Rilascio di una nuova revisione in Cloud Run
