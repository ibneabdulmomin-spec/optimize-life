# Security Specification

1. Data Invariants: 
   - User document must map to request.auth.uid.
   - User document contains only verified phone numbers.

2. The "Dirty Dozen" Payloads:
   - Create user without matching ID.
   - Create user with incorrect typing (number for phone instead of string).
   - Update user with ghost field.
   - Read non-owned user document.
   - List users without being authenticated.
   - (More can be found in detailed tests)
