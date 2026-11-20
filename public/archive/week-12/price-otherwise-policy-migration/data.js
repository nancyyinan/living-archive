window.PRICE_OTHERWISE_DATA = {
  sources: [
    { id: "ers-note", agency: "USDA Economic Research Service", title: "Retail egg prices fall, following declining wholesale prices", date: "2025-06-03", url: "https://www.ers.usda.gov/data-products/charts-of-note/112677" },
    { id: "ers-may", agency: "USDA Economic Research Service", title: "Livestock, Dairy, and Poultry Outlook: May 2025", date: "2025-05-16", url: "https://ers.usda.gov/sites/default/files/_laserfiche/outlooks/112616/LDP-M-371.pdf?v=85906" },
    { id: "ers-march", agency: "USDA Economic Research Service", title: "Livestock, Dairy, and Poultry Outlook: March 2025", date: "2025-03-17", url: "https://www.ers.usda.gov/media/10705/ldp-m-369.pdf" },
    { id: "bls-fred", agency: "U.S. Bureau of Labor Statistics via FRED", title: "Average Price: Eggs, Grade A, Large (Cost per Dozen) in U.S. City Average", date: "Monthly series", url: "https://fred.stlouisfed.org/series/APU0000708111" },
    { id: "ams-feb", agency: "USDA Agricultural Marketing Service", title: "Egg Markets Overview — February 28, 2025", date: "2025-02-28", url: "https://mymarketnews.ams.usda.gov/filerepo/sites/default/files/3725/2025-02-28/1200497/ams_3725_00065.pdf" },
  ],
  records: [
    {
      id: "hpai-wave", date: "2025-03-10", dateLabel: "Mid-Oct 2024 — 10 Mar 2025", title: "HPAI wave reaches laying flocks", institution: "USDA ERS", category: "supply", type: "Supply disruption", row: 0,
      value: "50.7 million", unit: "egg-laying hens lost", summary: "USDA reports that the HPAI wave spanning mid-October 2024 through early March 2025 resulted in the depopulation of 50.7 million egg-laying hens.",
      limit: "This cumulative loss does not quantify the contribution of HPAI to any single monthly price. Demand, inventory, geography, contracts, and replacement capacity also matter.", sourceIds: ["ers-note", "ers-march"], keywords: "HPAI avian influenza depopulation losses flock supply"
    },
    {
      id: "layer-inventory", date: "2025-02-01", dateLabel: "01 Feb 2025", title: "Table-egg layer inventory", institution: "USDA ERS / NASS", category: "supply", type: "Inventory observation", row: 0,
      value: "291.5 million", unit: "layers; 5.8% below year earlier", summary: "The productive table-egg flock was at its lowest February level since November 2015, indicating constrained capacity at the start of the study window.",
      limit: "A first-of-month stock is not monthly egg production. Lay rate, bird age, flock composition, and restocking also affect output.", sourceIds: ["ers-march"], keywords: "inventory layers hens productive capacity"
    },
    {
      id: "supply-pressure", date: "2025-02-15", dateLabel: "Feb — Apr 2025", title: "Tight supply meets changing demand", institution: "USDA ERS synthesis", category: "mechanism", type: "Documented mechanism", row: 0,
      value: "Context", unit: "not a measured series", summary: "USDA reports tight supplies and strong demand around the February high, followed by declining demand and a pause in new HPAI confirmations during the early-March wholesale decline.",
      limit: "This node summarizes agency reporting. It is not a complete causal model and does not establish a single driver of price change.", sourceIds: ["ers-note", "ers-march"], keywords: "supply demand seasonal pressure mechanism"
    },
    {
      id: "wholesale-feb", date: "2025-02-15", dateLabel: "Feb 2025 monthly average", title: "New York wholesale — February", institution: "USDA ERS / AMS", category: "wholesale", type: "Price observation", row: 0,
      value: "$8.20", numericValue: 8.20, unit: "per dozen large eggs", summary: "The New York wholesale monthly average reached the high point in this three-month collection.",
      limit: "This is a wholesale benchmark, not the price paid by every retailer or consumer. Its geography and product definition differ from the BLS retail series.", sourceIds: ["ers-note", "ers-may", "ams-feb"], keywords: "February New York wholesale peak"
    },
    {
      id: "retail-feb", date: "2025-02-15", dateLabel: "Feb 2025 monthly average", title: "U.S. retail — February", institution: "U.S. BLS", category: "retail", type: "Price observation", row: 0,
      value: "$5.897", numericValue: 5.897, unit: "per dozen Grade A large eggs", summary: "The national retail average rose in February while the New York wholesale benchmark reached its collection peak.",
      limit: "BLS says average prices are best used to describe a month’s price level. This national urban series is not geographically matched to New York wholesale.", sourceIds: ["bls-fred", "ers-may"], keywords: "February retail BLS city average"
    },
    {
      id: "wholesale-mar", date: "2025-03-15", dateLabel: "Mar 2025 monthly average", title: "New York wholesale — March", institution: "USDA ERS / AMS", category: "wholesale", type: "Price observation", row: 0,
      value: "$5.34", numericValue: 5.34, unit: "per dozen large eggs", summary: "The benchmark dropped sharply. USDA describes the early-month decline alongside weaker demand and a pause in new HPAI confirmations.",
      limit: "The accompanying conditions do not establish one sufficient cause for the decline.", sourceIds: ["ers-note", "ers-may"], keywords: "March New York wholesale decline"
    },
    {
      id: "retail-mar", date: "2025-03-15", dateLabel: "Mar 2025 monthly average", title: "U.S. retail — March", institution: "U.S. BLS", category: "retail", type: "Price observation", row: 0,
      value: "$6.227", numericValue: 6.227, unit: "per dozen Grade A large eggs", summary: "Retail reached its collection peak one month after wholesale, when the wholesale monthly average was already lower.",
      limit: "The one-month offset is descriptive, not proof of a fixed pass-through lag. The two series differ in scope and collection method.", sourceIds: ["bls-fred", "ers-note"], keywords: "March retail peak lag BLS"
    },
    {
      id: "wholesale-apr", date: "2025-04-15", dateLabel: "Apr 2025 monthly average", title: "New York wholesale — April", institution: "USDA ERS / AMS", category: "wholesale", type: "Price observation", row: 0,
      value: "$3.74", numericValue: 3.74, unit: "per dozen large eggs", summary: "The monthly average was less than half February’s level. USDA notes lower seasonal demand despite low inventories.",
      limit: "A lower wholesale benchmark does not imply an immediate or equal retail change, nor that supply constraints disappeared.", sourceIds: ["ers-note", "ers-may"], keywords: "April New York wholesale decline"
    },
    {
      id: "retail-apr", date: "2025-04-15", dateLabel: "Apr 2025 monthly average", title: "U.S. retail — April", institution: "U.S. BLS", category: "retail", type: "Price observation", row: 0,
      value: "$5.122", numericValue: 5.122, unit: "per dozen Grade A large eggs", summary: "The national retail average turned downward, but remained above the April wholesale benchmark.",
      limit: "The gap is not a retailer-margin calculation. The observations cover different markets and omit other supply-chain costs.", sourceIds: ["bls-fred", "ers-note", "ers-may"], keywords: "April retail decline BLS"
    },
    {
      id: "retail-pricing", date: "2025-03-01", dateLabel: "Across the study window", title: "Contracts and pricing strategies mute movement", institution: "USDA ERS", category: "mechanism", type: "Documented mechanism", row: 1,
      value: "Variable delay", unit: "directional relationship", summary: "USDA says retail pricing strategies and contracts can mute short-term wholesale fluctuations; retail prices tend to lag wholesale direction and may remain elevated longer.",
      limit: "The sources do not estimate one universal lag length or a pass-through coefficient for these three monthly observations.", sourceIds: ["ers-note"], keywords: "contracts pricing retail lag transmission"
    },
    {
      id: "replacement-time", date: "2025-03-17", dateLabel: "Mar 2025 outlook", title: "Replacing productive hens takes time", institution: "USDA ERS", category: "mechanism", type: "Biological delay", row: 0,
      value: "Recovery delayed", unit: "production constraint", summary: "Even with an above-average supply of replacement pullets, USDA expected the industry to require time to fully recover the egg-laying flock.",
      limit: "This supports the existence of a recovery delay, not a precise date when supply or prices normalize.", sourceIds: ["ers-march"], keywords: "replacement pullets recovery biological delay"
    },
  ],
  relations: [
    ["hpai-wave", "layer-inventory", "reduces", "USDA links HPAI losses to fewer productive layers.", "documented"],
    ["layer-inventory", "supply-pressure", "constrains", "Lower productive inventory is one component of tight supply.", "documented"],
    ["replacement-time", "supply-pressure", "prolongs", "Restoring productive capacity takes time.", "documented"],
    ["supply-pressure", "wholesale-feb", "contributes to", "USDA reports tight supply and strong demand alongside the February high.", "documented"],
    ["wholesale-feb", "wholesale-mar", "falls before", "The wholesale monthly average turns down from February to March.", "observed"],
    ["wholesale-mar", "wholesale-apr", "continues downward", "The wholesale average falls again in April.", "observed"],
    ["retail-feb", "retail-mar", "rises into", "The retail average reaches its local peak in March.", "observed"],
    ["retail-mar", "retail-apr", "turns downward", "The retail average declines in April.", "observed"],
    ["wholesale-feb", "retail-mar", "precedes", "The wholesale peak occurs one month before the retail peak; sequence is not proof.", "observed"],
    ["retail-pricing", "retail-mar", "may delay", "USDA says contracts and pricing strategies can mute short-term movement.", "documented"],
    ["retail-pricing", "retail-apr", "may keep elevated", "USDA says retail prices may decline more slowly.", "documented"],
  ].map(([from, to, verb, note, kind]) => ({ from, to, verb, note, kind })),
  relationLayout: {
    "hpai-wave": [250, 260], "layer-inventory": [430, 365], "replacement-time": [300, 650], "supply-pressure": [600, 520],
    "wholesale-feb": [775, 250], "wholesale-mar": [875, 430], "wholesale-apr": [805, 665],
    "retail-feb": [1115, 255], "retail-mar": [1280, 420], "retail-apr": [1195, 665], "retail-pricing": [1460, 510],
  },
};
