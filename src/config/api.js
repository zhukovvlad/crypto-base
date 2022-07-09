export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`;

export const CoinData = (id) => 
`https://api.coingecko.com/api/v3/coins/${id}`;