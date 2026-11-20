const KINETIC_ATLAS_DATA = {
  months: [
    { id: "feb", short: "FEB", label: "February 2025", wholesale: 8.2, retail: 5.897 },
    { id: "mar", short: "MAR", label: "March 2025", wholesale: 5.34, retail: 6.227 },
    { id: "apr", short: "APR", label: "April 2025", wholesale: 3.74, retail: 5.122 },
  ],
  series: {
    wholesale: {
      label: "New York wholesale",
      shortLabel: "NY wholesale",
      color: "terracotta",
      geography: "New York wholesale benchmark",
      product: "Large eggs",
      definition: "USDA ERS monthly average of the New York wholesale price for large eggs, compiled from USDA AMS market data.",
      limitation: "This is a New York wholesale benchmark, not the price paid by every retailer or consumer. It is not geographically or statistically identical to the national retail series.",
      sourceIds: ["ers-may", "ers-note"],
    },
    retail: {
      label: "U.S. urban average retail",
      shortLabel: "U.S. retail",
      color: "blue",
      geography: "U.S. city average",
      product: "Grade A large eggs",
      definition: "BLS average consumer price for a dozen large white Grade A chicken eggs across urban areas priced for the CPI; not seasonally adjusted.",
      limitation: "The retail series combines multiple production types and locations. Its distance from the wholesale series is not a retailer-margin calculation.",
      sourceIds: ["bls-fred", "ers-note"],
    },
  },
  readings: {
    feb: {
      wholesale: "The wholesale benchmark is at its highest observed level in this three-month study.",
      retail: "The national retail average is below the February New York wholesale benchmark.",
    },
    mar: {
      wholesale: "The wholesale benchmark drops sharply from February.",
      retail: "The retail average reaches its three-month high while wholesale is already lower.",
    },
    apr: {
      wholesale: "The wholesale benchmark falls again, to less than half its February level.",
      retail: "The retail average turns downward, but remains above the April wholesale benchmark.",
    },
  },
  sources: [
    {
      id: "ers-may",
      agency: "USDA Economic Research Service",
      title: "Livestock, Dairy, and Poultry Outlook: May 2025",
      coverage: "Monthly New York wholesale and national retail prices",
      url: "https://ers.usda.gov/sites/default/files/_laserfiche/outlooks/112616/LDP-M-371.pdf?v=85906",
    },
    {
      id: "bls-fred",
      agency: "U.S. Bureau of Labor Statistics via FRED",
      title: "Average Price: Eggs, Grade A, Large (Cost per Dozen) in U.S. City Average",
      coverage: "U.S. city average retail price, not seasonally adjusted",
      url: "https://fred.stlouisfed.org/series/APU0000708111",
    },
    {
      id: "ers-note",
      agency: "USDA Economic Research Service",
      title: "Retail egg prices fall, following declining wholesale prices",
      coverage: "Price movement, retail lag, and limits of wholesale-to-retail comparison",
      url: "https://www.ers.usda.gov/data-products/charts-of-note/112677",
    },
  ],
};
