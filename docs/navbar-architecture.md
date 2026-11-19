# Navbar Context-Aware Architecture
- On Landing Page (/): Displays marketing anchors (Features, Why PulseWatch, How It Works, Reviews).
- On Console (/dashboard/*): Hides marketing links completely; displays live system indicator.

- Brand Logo Routing: Always points to / so operators can return home from within any dashboard subpage.


- Console Status Indicator: Animated pulsing green indicator SYSTEM LIVE displayed on all dashboard routes.


- Global Session Hook: useQuery(['currentUser']) automatically retrieves active user session from query cache.


- Landing Viewport Auth: Returning to landing page displays Dashboard button and account dropdown rather than Login.


- Anti-Flicker Skeleton: Smooth pill skeleton prevents layout jump while session cookie is verifying on cold page loads.

