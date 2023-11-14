let country_list = {
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

  // Accessing HTML elements and saving them as variables


const fromCurrencySelect = document.querySelector('#first-currency select');
const toCurrencySelect = document.querySelector('#second-currency select');
const exchangeRateDisplay = document.querySelector('#exchange-rate');
const getExchangeRateBtn = document.querySelector('button');

for (let currencyCode in country_list ) {
    const optionFrom = document.createElement('option');
    const optionTo = document.createElement('option');

    optionFrom.value = currencyCode;
    optionTo.value = currencyCode;

    if (currencyCode === 'USD') {
        optionFrom.selected = true;
    }
     if (currencyCode === 'GHS'){
        optionTo.selected = true;
     }

     optionFrom.text = currencyCode;
     optionTo.text = currencyCode;

     fromCurrencySelect.add(optionFrom);
     toCurrencySelect.add(optionTo);
}

function loadFlag(selectElement) {
    const currencyCode = selectElement.value;
    const flagImg = selectElement.parentElement.querySelector('img');
    flagImg.src = `https://flagcdn.com/48x36/${country_list[currencyCode].toLowerCase()}.png`;

}

fromCurrencySelect.addEventListener('change', (e) => loadFlag(e.target));
toCurrencySelect.addEventListener('change', (e) => loadFlag(e.target));

window.addEventListener("load", () => {
    getExchangeRate();
});

getExchangeRateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate()
});

const reverse = document.querySelector(".reverse");
reverse.addEventListener("click", () => {
    let tempCode = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = tempCode;
    loadFlag(fromCurrencySelect);
    loadFlag(toCurrencySelect);
    getExchangeRate();
})



function getExchangeRate() {
    const amount = document.querySelector("input");
    const exchangeRateTxt = document.getElementById("exchange-rate");

    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    const fromCurrencyCode = fromCurrencySelect.value;  // Use value property
    const toCurrencyCode = toCurrencySelect.value;

    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/28393d4f9019e1e3194031d6/latest/${fromCurrencyCode}`;

    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let exchangeRate = result.conversion_rates[toCurrencyCode];
            let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrencyCode} = ${totalExchangeRate} ${toCurrencyCode}`;
        })
        .catch(() => {
            exchangeRateTxt.innerText = "Something went wrong";
        });
}




