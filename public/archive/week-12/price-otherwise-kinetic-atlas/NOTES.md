# Price, Otherwise — Kinetic Atlas Study

This directory is an independent visual proof of concept. It does not replace or modify `price-otherwise`.

## One interaction

The month scrubber snaps to three observed monthly averages: February, March, and April 2025. It does not calculate or display intermediate values. The full series use straight segments between reported observations; no smoothed curve or causal claim is encoded.

## Data definitions

- **New York wholesale:** USDA ERS monthly average of the New York wholesale price for large eggs, compiled from USDA AMS data: `$8.20`, `$5.34`, `$3.74` per dozen.
- **U.S. retail:** BLS U.S. city average for Grade A large eggs, not seasonally adjusted: `$5.897`, `$6.227`, `$5.122` per dozen.

The two series differ in geography, market stage, product definition, and collection method. Their visual distance is not a retail-margin calculation.

## Review route

1. Start in February and compare the two positions on the shared axis.
2. Scrub to March: wholesale moves down while retail reaches the study-window high.
3. Scrub to April: both are lower, but by different amounts.
4. Click either observed point, or use **Evidence**, to inspect its definition, limitation, and federal sources.
