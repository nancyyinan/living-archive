const STITCH_OTHERWISE_DATA = (() => {
  const schema = [
    { key: "stitch_id", category: "action", label: "Stitch ID", type: "string", required: true, note: "Stable identifier assigned before observation." },
    { key: "planned_slot", category: "action", label: "Planned capture slot", type: "integer", required: true, note: "Experiment setup only; not the observed work sequence." },
    { key: "actual_sequence", category: "action", label: "Actual work sequence", type: "integer", required: true, note: "Order in which the stitch was actually completed." },
    { key: "started_at", category: "time", label: "Started at", type: "timestamp", required: true, note: "Timer start for this stitch." },
    { key: "completed_at", category: "time", label: "Completed at", type: "timestamp", required: true, note: "Moment the stitch is accepted as complete." },
    { key: "active_duration_ms", category: "time", label: "Active duration", type: "milliseconds", required: true, note: "Elapsed making time excluding recorded pauses." },
    { key: "pause_count", category: "correction", label: "Interruption count", type: "integer", required: true, note: "Count of explicitly logged pauses. Missing is not zero." },
    { key: "pause_duration_ms", category: "correction", label: "Interrupted duration", type: "milliseconds", required: false, note: "Combined duration of logged pauses." },
    { key: "correction_count", category: "correction", label: "Correction count", type: "integer", required: true, note: "Count of undo or rework events. Missing is not zero." },
    { key: "correction_duration_ms", category: "correction", label: "Correction duration", type: "milliseconds", required: false, note: "Time spent undoing or reworking this stitch." },
    { key: "thread_id", category: "material", label: "Thread ID", type: "string", required: true, note: "Identifier for the measured thread sample." },
    { key: "thread_length_before_mm", category: "material", label: "Thread length before", type: "millimetres", required: false, note: "Optional direct material measurement before stitching." },
    { key: "thread_length_after_mm", category: "material", label: "Thread length after", type: "millimetres", required: false, note: "Optional direct material measurement after stitching." },
    { key: "fabric_id", category: "material", label: "Fabric ID", type: "string", required: true, note: "Identifier for fabric count and sample." },
    { key: "fabric_cell", category: "material", label: "Fabric cell", type: "row,column", required: true, note: "Observed grid location of the completed X." },
    { key: "needle_id", category: "material", label: "Needle / tool ID", type: "string", required: false, note: "Tool identifier if tool changes are part of the experiment." },
    { key: "notes", category: "action", label: "Observation note", type: "text", required: false, note: "Short note for circumstances not captured elsewhere." },
  ];

  const stitches = Array.from({ length: 24 }, (_, index) => ({
    stitch_id: `X${String(index + 1).padStart(2, "0")}`,
    planned_slot: index + 1,
    actual_sequence: null,
    started_at: null,
    completed_at: null,
    active_duration_ms: null,
    pause_count: null,
    pause_duration_ms: null,
    correction_count: null,
    correction_duration_ms: null,
    thread_id: null,
    thread_length_before_mm: null,
    thread_length_after_mm: null,
    fabric_id: null,
    fabric_cell: null,
    needle_id: null,
    notes: null,
    status: "awaiting-observation",
  }));

  return {
    experiment: {
      title: "Stitch, Otherwise",
      proposition: "One stitch is more than a mark.",
      unit: "one completed cross-stitch (X)",
      planned_sample_size: 24,
      observed_count: 0,
      status: "DATA TEMPLATE — NO MAKING OBSERVATIONS RECORDED",
      integrity_note: "Null values are missing observations, not zero measurements.",
    },
    categories: [
      { id: "material", label: "MATERIAL", description: "Thread, fabric, and tool identifiers or direct measurements." },
      { id: "action", label: "ACTION", description: "One accepted cross-stitch, identified as X01–X24." },
      { id: "time", label: "TIME", description: "Observed start, completion, and active duration." },
      { id: "correction", label: "CORRECTION", description: "Logged interruptions, undoing, and reworking." },
    ],
    schema,
    stitches,
  };
})();
