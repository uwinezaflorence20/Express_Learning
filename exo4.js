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



const express = require("express");
const app = express();

const PORT = 3000;

// Conversion rates
const rates = {
    usd: 1300,
    eur: 1400,
    gbp: 1600
};

app.get("/convert", (req, res) => {
    const { amount, currency } = req.query;

    // Check missing parameters
    if (!amount || !currency) {
        return res.status(400).json({
            error: "Amount and currency are required"
        });
    }

    // Convert amount to number
    const value = Number(amount);

    // Validate amount
    if (isNaN(value)) {
        return res.status(400).json({
            error: "Amount must be a number"
        });
    }

    // Validate currency
    if (!rates[currency]) {
        return res.status(400).json({
            error: "Currency must be usd, eur, or gbp"
        });
    }

    const convertedAmount = value * rates[currency];

    res.json({
        input: {
            amount: value,
            currency: currency
        },
        convertedAmount: convertedAmount,
        unit: "RWF"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});