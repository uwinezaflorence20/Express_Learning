// Build an Express server with a single GET endpoint /convert.

// Accept two query parameters:
// amount (numeric)
// currency (either "usd", "eur", or "gbp")
// The server should convert the given amount to Rwandan Francs (RWF) using predefined conversion rates stored in a JavaScript object.
// Respond with a JSON object showing the input and the converted value:

//   {
//     "input": { "amount": 10, "currency": "usd" },
//     "convertedAmount": 13000,
//     "unit": "RWF"
//   }


// Handle missing or invalid parameters with a 400 response and descriptive error.

const express = require('express');
const app = express();
let rates = {
    usd: 1500,
    eur: 1200,
    gbp: 1000
}

app.get("/",(req,res)=>{
    res.send("This is the HomePage");
})
app.get('/convert', (req, res) => {
    let { amount, currency } = req.query;
    if (!amount || !currency) {
        return res.status(400).json({ error: "amount and currency are required" });
    }
    let value = Number(amount);
    if (isNaN(value)) {
        return res.status(400).json({error: "The amount should be a numbers"});
    }

    if(!rates[currency]){
        return res.status(400).json({error:"The currency should be usd,eur and gbp"});
    }
    let convertedValue = value * rates[currency];

    res.json({
        input:{
            amount:value,
            currency:currency
        },
        convertedValue:convertedValue,
        unit:"RWF"
    })
})

app.listen(5000,()=>{
    console.log("The server is running locally on 5000 port");
})