# Disaster Intelligence System (DIS)

## System Overview
The Disaster Intelligence System is a real-time, interactive geographic tool designed to crowdsource, verify, and resolve emergency incidents (Floods, Fires, Earthquakes, etc.). It acts as a digital nervous system bridging the gap between localized community intelligence and professional rescue operations.

The system is built on a two-portal architecture:

1. **Public Viewer Portal**
   - **Real-Time Reporting**: Citizens can instantly log emergency events geographically across a live map, complete with threat-level mapping and media evidence (images/videos).
   - **Trust Verification System**: Built-in community verification allows users to "Upvote" incidents. Algorithms track localized overlaps and upgrade trust levels to "Verified," shielding responders from false alarms.
   
2. **Rescuer Command Center**
   - **Predictive Intel Heatmap**: Rescuers can digitally "draw" custom geofences across the map. A built-in heatmap calculator automatically maps demand based on report clusters, unassigned distress signals, and community upvotes—converting raw data into clear, dark red hotspots representing urgent need.
   - **Operational Dispatch**: Emergency operators can assume command over individual incidents, digitally assigning rescue teams to specific coordinates and instantly broadcasting status updates to the public map.


## Technical Stack
* **Frontend**: HTML/CSS + JavaScript
* **Web Mapping**: Leaflet.js & Satellite integrations
* **Backend**: Node.js & Express
