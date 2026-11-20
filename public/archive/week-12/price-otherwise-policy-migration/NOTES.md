# Price, Otherwise — original-design migration

This is an independent iteration built from the source architecture and visual language of `../policy-otherwise/`.

## Reused from Policy, Otherwise

- Fixed editorial header and Relation / Chronology switch
- SVG grid with separate axis, relation-edge, and node layers
- Minimal default nodes with hover identification
- Selection-driven neighbor focus and right-side detail drawer
- Searchable, filterable Index drawer
- `records`, `relations`, and explicit relation-position data structures

## Evidence policy

- Solid relation: documented economic or biological mechanism described by USDA
- Dashed relation: observed temporal sequence in the verified price records
- No causal claim is inferred from chronological proximity
- No unverified hypothesis is encoded as a relation in this collection

## Focused visual improvement

- Chronology retains the original row-based matrix but adds two restrained price trajectories.
- Price observations use a shared value-to-y offset within their market-stage rows, making the February wholesale peak and March retail peak visually distinct.
- The selected record now persists when switching between Relation and Chronology and when closing the detail drawer.
- Relation edges retain evidence-status line styles and become legible only when a connected record is selected.

Open `comparison.html` for the required side-by-side visual review of the original and the migration.

## Source verification

- USDA ERS confirms the February-to-April 2025 New York wholesale averages: `$8.20`, `$5.34`, `$3.74` per dozen.
- BLS series `APU0000708111` confirms the U.S. city-average retail values: `$5.897`, `$6.227`, `$5.122`.
- USDA ERS reports `291.5 million` table-egg layers on February 1, 2025, down `5.8%` year over year.
- USDA ERS reports `50.7 million` egg-laying hens lost during the HPAI wave from mid-October 2024 through early March 2025.
