# Festival Simulator

The app models real-world festival constraints such as attendance, weather, staffing, energy usage, costs and revenue to produce realistic operational and financial outcomes.

---

## How to Run

```bash
npm install
npm run dev
```

## Testing

The project includes unit tests for:
- Financial calculations (CAPEX, OPEX, revenue aggregation)
- Metrics calculations (energy, water, staffing, risk)
- Simulation logic (attendance bounds, weather handling)

Run tests with:

```bash
npm test
```

## Features

### User System (Local Storage)
- Create and persist a user profile locally using browser storage

### Festival Design
Users can configure a festival by adding:
- Artists (with costs)
- Stages (capacity + cost)
- Vendors (cost + revenue per attendee)
- Staff
- Toilets, speakers, bins
- Ticket pricing and festival duration

---

### Simulation Engine
The festival is simulated over multiple days with:
- Dynamic attendance modelling
- Weather-based impact (sun, rain, snow, storm)
- Ticket and vendor revenue calculations
- Crowd satisfaction scoring

---

### Metrics System
The app calculates operational and logistical metrics including:
- CAPEX (setup costs)
- OPEX (operational costs over time)
- Energy usage (stages, vendors, speakers, toilets)
- Water usage (based on attendance and facilities)
- Staffing requirements (staff, medics, vendors)
- Crowd density risk
- Toilet requirements

---

### Finance System
- Total revenue (tickets + vendors)
- Vendor revenue breakdown
- Profit estimation (revenue - costs)

---

### Export Features
Users can export the current simulation result as:
- JSON (full structured snapshot of festival + results)
- CSV (daily simulation data)

---

## How the Simulation Works

### Attendance Model
Attendance is influenced by:
- Festival capacity
- Number of artists and vendors
- Ticket price
- Random variation
- Weather conditions

### Weather Effects
- Sunny => increased attendance
- Rain => reduced attendance
- Snow => moderate reduction
- Storm => severe reduction

### Revenue Model
- Ticket revenue = attendance x ticket price
- Vendor revenue = attendance x vendor engagement factor

---

## Key Assumptions

- Energy usage is modelled per stage, speaker, vendor and toilet per day
- Water usage scales with attendance + toilet count
- Staffing requirements scale with attendance and infrastructure complexity
- Crowd satisfaction is bounded between 0–100
- Weather probabilities are predefined and fixed

## Future Improvements

If given more time, I would further improve the simulation accuracy and system robustness in the following areas:

### Expanded Test Coverage
Increase unit and integration testing across:
- edge cases in simulation randomness
- financial calculation stability
- cross-system interactions (simulation => metrics => finance)

### Improved Vendor Revenue Model
Refine vendor revenue calculations by:
- modelling different vendor types (food, drinks, merchandise)
- introducing effects (diminishing returns at high attendance, stock)
- reducing reliance on uniform engagement randomness

### More Realistic Weather System
Replace the current fixed probability model with:
- location-based weather patterns
- possible weather API integration?

### Simulation Refinement
Iterate on the attendance and satisfaction models to:
- reduce randomness sensitivity
- introduce more structured probabilistic distributions
- better simulate real-world demand curves across festival days

### Performance and Scalability Improvements
Refactor simulation pipeline to better support:
- larger festivals with higher complexity
- reusable calculation modules
- clearer separation between deterministic and stochastic logic