# add-balance-apay-amex
A script to automatically add money to Amazon Pay using AMEX card to meet the milestone rewards.


## Environment variables

Add a file named `cypress.env.json` in the root folder with the following details:

```json
{
    "AMZN_BASE_URL": "https://www.amazon.in",
    "AMZN_USER_NAME": "amazon-email@domain.com",
    "AMZN_PASS": "your-amazon-paasword",
    "CARDS": [
        {
            "name": "Something",
            "rechargeAmount": "1000",
            "repeat": 6,
            "cvv": "1234",
            "number": "123123123123",
            "expiry": {
                "month": "00",
                "year": "1234"
            }
        }
    ]
}

```

## Running the script

Just run the command `npm run recharge`