# Stitch, Otherwise — observation schema

## Study status

- Planned observation units: 24 completed cross-stitches.
- Recorded observation units: 0.
- Every production field is currently null.
- Null means “not observed.” It must never be treated as zero seconds, zero corrections, or zero material use.

## Unit of observation

One record represents one accepted cross-stitch (X). X01–X24 are capture identifiers and planned slots, not completed results.

## Proposed capture protocol

1. Assign IDs to the thread sample, fabric sample, and needle or tool before beginning.
2. Start the per-stitch timer at the agreed first making action. Use the same operational definition for every record.
3. Record each explicit pause and each undo or rework event while it happens.
4. Mark completion only when the X is accepted and no immediate correction remains.
5. Record actual sequence separately from planned slot; they may differ.
6. If directly measuring thread use, record length before and after with one consistent method. Otherwise leave both fields null.

## Required distinctions

- Planned slot is experiment structure; actual sequence is an observation.
- Completed-at is a timestamp; active duration is a calculated interval after logged pauses.
- No correction record means missing until the observer explicitly records a zero.
- Thread length difference is not available unless both before and after values are measured.

## Visual mapping

- Relation X position: category or planned action grid.
- Relation curves: schema joins for the selected stitch record.
- Lower X position: planned capture slot until actual sequence exists.
- Chronology X position after collection: actual completion timestamp or actual sequence.
- Chronology Y position after collection: one selected metric at a time, such as active duration or correction duration.
- Dashed lines: schema or placeholder relationships.
- Solid lines: reserved for observed relationships after data collection.
