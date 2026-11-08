# Collapsible Sidebar Specification
- Screen-height locked: h-[calc(100vh-4rem)]
- Does not scroll with page content; page content scrolls independently.
- Seam-perched circular collapse toggle button directly on the right border line.

- State Persistence: Persists pulsewatch_sidebar_collapsed in localStorage across sessions.


- Shortcut Listener: Global window keydown listener for Ctrl+B / Meta+B.


- Collapsed Tooltips: Floating badges with pointer-events-none fade-in when sidebar is 76px wide.


- Layout Viewport: h-screen overflow-hidden wrapper with independent overflow-y-auto main container.

