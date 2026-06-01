# Festival Simulation - Calculations

# 1. Simulation Overview

The festival simulation runs day-by-day for the duration of the festival durationDays set by the user.

Each day generates:
- Attendance
- Weather conditions
- Ticket revenue
- Vendor revenue
- Crowd satisfaction score

The simulation models how external and internal factors affect festival performance over time using a simplified stochastic system.

---

# 2. Capacity Model

Total festival capacity is calculated as:

MaxCapacity = sum of all stage capacities

This represents the absolute upper limit of attendance per day.

---

# 3. Weather System

Weather is randomly generated each day using weighted probabilities:

- Sunny => 50%
- Cloudy => 25%
- Rain => 15%
- Snow => 5%
- Storm => 5%

Weather impacts attendance and crowd satisfaction using multipliers:

- Sunny => 1.0
- Cloudy => 1.0
- Rain => 0.8
- Snow => 0.9
- Storm => 0.5

---

# 4. Attendance Calculation

Attendance is calculated using a combination of demand, festival attractiveness, pricing, and randomness.

## 4.1 Base Attendance

Base demand is computed as:

BaseAttendance = MaxCapacity x (0.6 + random(0.4) + artistFactor + vendorFactor)

Where:
- random(0.4) introduces variability (0–0.4)
- artistFactor = numberOfArtists x 0.02
- vendorFactor = numberOfVendors x 0.01

---

## 4.2 Ticket Price Adjustment

A price elasticity factor is applied:

- ticketCost > 200 => 0.9
- ticketCost < 80 => 1.1
- otherwise => 1.0

---

## 4.3 Weather Adjustment

Attendance is then adjusted based on weather:

- Rain => x0.8
- Snow => x0.9
- Storm => x0.5
- Sunny/Cloudy => x1.0

---

## 4.4 Final Attendance

Final attendance is computed as:

Attendance = floor(BaseAttendance x PriceMultiplier x WeatherMultiplier)
Attendance = min(Attendance, MaxCapacity)

---

# 5. Revenue Model

Revenue is split into ticket and vendor revenue.

---

## 5.1 Ticket Revenue

TicketRevenue is calculated as:

TicketRevenue = Attendance x TicketCost

---

## 5.2 Vendor Revenue

Vendor revenue is modelled using per-vendor engagement.

Each vendor has a random engagement rate between 0.3 and 0.7:

VendorEngagement = 0.3 + random(0.4)

VendorRevenue = Attendance x SumOf(vendor.revenuePerAttendee x VendorEngagement)

---

# 6. Crowd Satisfaction

Crowd satisfaction is calculated using a separate scoring system based on operational and experiential factors.

The base score starts at 100 and is adjusted using festival conditions.

---

## 6.1 Weather Impact

- Sunny => +5
- Cloudy => +2
- Rain => -10
- Snow => -5
- Storm => -20

---

## 6.2 Infrastructure Quality

Toilet ratio:

- 1:80 attendees => -80
- 1:50 attendees => -15
- 1:30 attendees => -5
- otherwise => +5

Speakers:

- 5 speakers => -10
- 20 speakers => +10

Medics:

- < 1 per 250 attendees => -15
- otherwise => +5

---

## 6.3 Festival Scale Effects

- +2 points per artist (max +15)
- +1.5 points per vendor (max +15)

---

## 6.4 Pricing Impact

- ticketCost > 200 => -10
- ticketCost < 80 => +5

---

## 6.5 Crowd Density Impact

Based on capacity utilisation:

- 90% capacity => -20 (overcrowding)
- 50% capacity => -5 (underutilised)

---

## 6.6 Final Score

Final score is clamped between:

Score = max(0, min(100, finalScore))

This ensures satisfaction remains within realistic bounds.

---

# 7. Output Per Day

Each simulation day returns:

- Day number
- Attendance
- Maximum capacity
- Weather condition
- Ticket revenue
- Vendor revenue
- Crowd satisfaction score


## 2. Finance

The finance system calculates the overall cost and revenue of the festival.

It is split into three main components:

- CAPEX (setup cost)
- OPEX (operational cost over time)
- Total Revenue (aggregated from simulation output)

The finance model is derived from both the festival configuration and the results of the simulation system.

---

### 2.1 CAPEX (Initial Setup Cost)

CAPEX represents the one-time upfront cost required to build and prepare the festival before it starts.

It includes:

- Artist booking costs
- Stage construction/setup costs
- Infrastructure costs (toilets, bins, speakers)

Formula:

CAPEX = Sum of artist costs + Sum of stage costs + (toiletCost x number of toilets) + (binCost x number of bins) + (speakerCost x number of speakers)

---

### 2.2 OPEX (Operational Cost)

OPEX represents the recurring operational cost per day, multiplied across the full festival duration.

It includes:

- Staff wages (per day)
- Vendor operational costs (per day)
- Medic staffing costs (per day)

Formula:

Daily OPEX = Sum of staff costPerDay + Sum of vendor costPerDay + (medicCost x number of medics)

Total OPEX = Daily OPEX x durationDays

---

### 2.3 Revenue Model

Revenue is calculated from the simulation output rather than directly from festival configuration.

Each simulation day produces:

- Ticket revenue
- Vendor revenue (stochastic per vendor engagement model)

These values are aggregated across all festival days.

---

#### Ticket Revenue

TicketRevenue = Attendance x TicketCost

---

#### Vendor Revenue

VendorRevenue is calculated per vendor using an engagement model:

For each vendor:

VendorRevenue += Attendance x (vendor.revenuePerAttendee x random engagement factor)

Where:

- engagement factor Rnd(0.3, 0.7)
- represents uncertain attendee interaction with vendors

---

### 2.4 Total Revenue

Total revenue is calculated by summing all daily simulation outputs:

For each day:

- Add ticket revenue
- Add vendor revenue

Final formulas:

TotalRevenue = Sum of all daily (ticket revenue + vendor revenue)

TotalVendorRevenue = Sum of all daily vendor revenue only

## 3. Metrics

The metrics system derives operational, safety and utility statistics from the simulation output.

All metrics are calculated using the average attendance across the full simulation period.

---

### 3.1 Average Attendance

Several metrics are based on average attendance rather than a single day.

Formula:

AverageAttendance = TotalAttendance ÷ NumberOfSimulationDays

Where:

TotalAttendance = Sum of all simulated daily attendance values

---

### 3.2 Energy Usage

Energy usage estimates the total electricity consumption of the festival across its entire duration.

The model assumes fixed energy requirements for key infrastructure:

- Stage = 3000 kWh per day
- Speaker = 1000 kWh per day
- Vendor = 300 kWh per day
- Toilet = 20 kWh per day

Formula:

EnergyUsage = ((NumberOfStages × 3000) × DurationDays) + ((NumberOfSpeakers × 1000) × DurationDays) + ((NumberOfVendors × 300) × DurationDays) + ((NumberOfToilets × 20) × DurationDays)

---

### 3.3 Staffing Requirements

Required staffing levels scale with attendance and festival complexity.

Formula:

StaffRequired = ceil((AverageAttendance ÷ 100) + (NumberOfStages × 3) + (NumberOfVendors × 2))

---

### 3.4 Medic Requirements

Medical staffing is estimated using attendee volume.

Formula:

MedicsRequired = ceil(AverageAttendance ÷ 300)

This assumes a minimum of one medic for every 300 attendees.

---

### 3.5 Vendor Requirements

Vendor requirements scale with both attendance and festival size.

Formula:

VendorsRequired = ceil((AverageAttendance ÷ 200) + NumberOfStages)

This assumes:

- One vendor is required for approximately every 200 attendees
- Additional stages increase demand for food and services

---

### 3.6 Staff Coverage Ratio

Staff coverage compares available personnel against estimated operational requirements.

Available personnel:

TotalStaffAvailable = NumberOfStaff + NumberOfVendors + NumberOfMedics

Formula:

TotalStaffCoverage = TotalStaffAvailable/(StaffRequired + MedicsRequired + VendorsRequired)

Interpretation:

- Greater than 1.0 → Surplus staffing
- Equal to 1.0 → Adequate staffing
- Less than 1.0 → Staffing shortage

---

### 3.7 Toilet Requirements

Required toilets are estimated using attendance.

Formula:

ToiletRequirement = ceil(AverageAttendance/70)

This assumes a minimum of one toilet for every 70 attendees.

---

### 3.8 Crowd Density Risk

Crowd density risk estimates potential safety concerns caused by overcrowding and poor weather conditions.

First calculate average capacity utilisation:

AverageCapacityUtilisation = AverageAttendance/MaxCapacity

Risk begins increasing when utilisation exceeds 70%.

Formula:

CrowdDensityRisk = max(0, (AverageCapacityUtilisation - 0.7)) × 100

Additional risk is added for poor weather:

BadWeatherDays = Number of Rain days + Number of Storm days

WeatherRisk = (BadWeatherDays ÷ NumberOfSimulationDays) × 10

Final risk:

CrowdDensityRisk = min(100, BaseRisk + WeatherRisk)

Interpretation:

- 0 → Very low risk
- 100 → Maximum risk

---

### 3.9 Water Usage

Water consumption is estimated using attendee volume and sanitation infrastructure.

Formula:

WaterUsage = (AverageAttendance × 5) + (NumberOfToilets × 50)

---

### 3.10 Output Metrics

The metrics system produces:

- Energy usage
- Water usage
- Staff required
- Medics required
- Vendors required
- Staff coverage ratio
- Toilet requirement
- Crowd density risk score
