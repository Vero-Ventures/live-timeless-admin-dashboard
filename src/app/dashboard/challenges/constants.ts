export const REPEATS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const UNIT_TYPES = [
  "General",
  "Scalar",
  "Mass",
  "Volume",
  "Duration",
  "Energy",
  "Length",
] as const;

export const RECURRENCE = ["per day", "per week", "per month"] as const;

export const UNIT_RANGES: {
  [k in (typeof UNIT_TYPES)[number]]: Record<
    string,
    {
      min: number;
      max: number;
      step: number;
    }
  >;
} = {
  General: {
    times: {
      min: 1,
      max: 1000,
      step: 1,
    },
    minutes: {
      min: 1,
      max: 1200,
      step: 1,
    },
  },
  Scalar: {
    times: {
      min: 1,
      max: 1000,
      step: 1,
    },
    steps: {
      min: 1000,
      max: 9900,
      step: 1000,
    },
  },
  Mass: {
    kg: {
      min: 1,
      max: 1000,
      step: 1,
    },
    grams: {
      min: 5,
      max: 4995,
      step: 5,
    },
    mg: {
      min: 1,
      max: 10000,
      step: 1,
    },
    oz: {
      min: 1,
      max: 1000,
      step: 1,
    },
    pounds: {
      min: 1,
      max: 1000,
      step: 1,
    },
    µg: {
      min: 5,
      max: 4995,
      step: 5,
    },
  },
  Volume: {
    litres: {
      min: 1,
      max: 1000,
      step: 1,
    },
    mL: {
      min: 100,
      max: 29900,
      step: 100,
    },
    "US fl oz": {
      min: 5,
      max: 995,
      step: 5,
    },
    cups: {
      min: 1,
      max: 1000,
      step: 1,
    },
  },
  Duration: {
    min: {
      min: 1,
      max: 1200,
      step: 1,
    },
    hours: {
      min: 1,
      max: 1000,
      step: 1,
    },
  },
  Energy: {
    joules: {
      min: 1000,
      max: 99000,
      step: 1000,
    },
    kilojoules: {
      min: 50,
      max: 41950,
      step: 50,
    },
    cal: {
      min: 500,
      max: 1999500,
      step: 500,
    },
    kcal: {
      min: 100,
      max: 9900,
      step: 100,
    },
  },
  Length: {
    metres: {
      min: 10,
      max: 49990,
      step: 10,
    },
    km: {
      min: 1,
      max: 1000,
      step: 1,
    },
    miles: {
      min: 1,
      max: 1000,
      step: 1,
    },
    feet: {
      min: 100,
      max: 99900,
      step: 100,
    },
    yards: {
      min: 50,
      max: 49950,
      step: 50,
    },
  },
};
