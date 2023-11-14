//currency code mapping to country code
let countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW"
  };

  // DOM elements
const fromCurrencySelect = document.querySelector('#first-currency select');
const toCurrencySelect = document.querySelector('#second-currency select');
const exchangeRateDisplay = document.querySelector('#exchange-rate');
const getExchangeRateBtn = document.querySelector('button');

// Function to create an option element for a currency
function createOption(currencyCode, selected = false) {
    const option = document.createElement('option');
    option.value = currencyCode;
    option.text = currencyCode;
    if (selected) {
        option.selected = true;
    }
    return option;
}

// Function to load flag image based on the selected currency
function loadFlag(selectElement) {
    const currencyCode = selectElement.value;
    const flagImg = selectElement.parentElement.querySelector('img');
    flagImg.src = `https://flagcdn.com/48x36/${countryList[currencyCode].toLowerCase()}.png`;
}

// Populating currency select dropdowns
for (let currencyCode in countryList) {
    fromCurrencySelect.add(createOption(currencyCode, currencyCode === 'USD'));
    toCurrencySelect.add(createOption(currencyCode, currencyCode === 'GHS'));
}

// Event listeners
fromCurrencySelect.addEventListener('change', (e) => loadFlag(e.target));
toCurrencySelect.addEventListener('change', (e) => loadFlag(e.target));

// Fetch exchange rate on page load
window.addEventListener("load", getExchangeRate);

// Fetch exchange rate on button click
getExchangeRateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

// Swap selected currencies and fetch exchange rate on reverse button click
const reverse = document.querySelector(".reverse");
reverse.addEventListener("click", () => {
    [fromCurrencySelect.value, toCurrencySelect.value] = [toCurrencySelect.value, fromCurrencySelect.value];
    [fromCurrencySelect, toCurrencySelect].forEach((select) => {
        loadFlag(select);
    });
    getExchangeRate();
});

// Function to fetch and display exchange rate
function getExchangeRate() {
    const amount = document.querySelector("input");
    const exchangeRateTxt = document.getElementById("exchange-rate");

    // Extract amount value, default to 1 if invalid or empty
    let amountVal = parseFloat(amount.value) || 1;

    const fromCurrencyCode = fromCurrencySelect.value;
    const toCurrencyCode = toCurrencySelect.value;

    // Display loading message
    exchangeRateTxt.innerText = "Getting exchange rate...";

    // API URL for exchange rate
    let url = `https://v6.exchangerate-api.com/v6/28393d4f9019e1e3194031d6/latest/${fromCurrencyCode}`;

    // Fetch exchange rate data
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let exchangeRate = result.conversion_rates[toCurrencyCode];
            let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrencyCode} = ${totalExchangeRate} ${toCurrencyCode}`;
        })
        .catch(() => {
            // Display error message if fetch fails
            exchangeRateTxt.innerText = "Something went wrong";
        });
}