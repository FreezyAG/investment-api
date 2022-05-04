# Investment App

An api that displays the best investment in gold during the last 5 years.

**Author:** Fisayo Agboola

**Environments**

Node version - v14.15.0

**This application uses the following technologies:**

- nodeJs
- javascript
- expressJs
- jest
- sinon
- superagent
- supertest

note: `run all commands in the applications root directory`

## To run the app via docker

```
docker-compose up
```

#

## To run the app manually

**Install all dependencies**

```
npm install
```

**Start the application**

```
- source .env
- npm start
```

#

## To test the application

```
npm run test 
```
or 
```
docker-compose run app npm run test
```

#

## Endpoint 
**`{BASE_URL}/best_investment_dates` - method (GET)**
```
e.g GET http://localhost:3000/best_investment_dates
```

- Fetch the best investment in gold during the last 5 years

**Response**

```bash
{
    "bestTimeToBuyGold": {
        "data": "2018-09-28",
        "cena": 139.32
    },
    "bestTimeToSellGold": {
        "data": "2022-03-09",
        "cena": 295.77
    },
    "message": "During the past 5 years, the best moment to buy gold was on 2018-09-28 at a rate of 139.32, while the best moment to sell gold was on 2022-03-09 at a rate of 295.77. Assuming you had $135, 000 USD to invest, you would have made a profit of $21120750"
}
```
