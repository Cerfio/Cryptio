# Cryptio `technical test`

![Image of Project](https://www.zupimages.net/up/19/36/g2n7.jpg)

**English version**

Project done in NodeJs to convert an amount from one value to another

Example 50 € in USD (55,18 USD at the time of today).

The app uses Api **Revolut** to be up-to-date at world exchange rates.

To launch the project:
```
node main.js
```
- A web interface is available on "/"

- Can receive POST requests on "/ server", to contain as header


```json
{
        "base_currency": "USD",
        "value": 1000,
        "quote_currency": "EUR"
}
```

You can also find the project on **Heroku**
https://stark-spire-27961.herokuapp.com/



**Version française**

Projet fait en NodeJs pour convertir un montant d'une valeur à une autre

Exemple 50 € en USD (55,18 USD à l'heure d'aujourd'hui).

L'application utilise l'Api **Revolut** pour être à jour au niveau des taux de change mondial.

Pour lancer le projet :
```
node main.js
```
- Une interface Web est disponible sur "/"

- Peut recevoir des requêtes POST sur "/server", devant contenir comme en-tête

```json
{
        "base_currency": "USD",
        "value": 1000,
        "quote_currency": "EUR"
}
```
Vous pouvez aussi retrouver le projet sur **Heroku**
https://stark-spire-27961.herokuapp.com/

***Have Fun !!!***
