# App

GymPass style app.

## Functional Requirements

- [x] Users must be able to register
- [x] Users must be able to authenticate;
- [x] Users must be able to retrieve the profile of a logged-in user
- [x] Users must be able to retrieve the number of check-ins performed by the logged-in user;
- [x] Users must be able to retrieve their check-in history
- [x] Users must be able to search for nearby gyms (10km)
- [x] Users must be able to search for gyms by name
- [x] Users must be able to check-in at a gym;
- [x] Users must be able to validate their check-in;
- [x] Gyms must be able to be registered

## Business Rules

- [x] Users must not be able to register with a duplicate email
- [x] Users cannot perform 2 check-ins on the same day;
- [x] Users cannot check-in if they are not near (100m) the gym;
- [ ] Check-ins can only be validated up to 20 minutes after creation;
- [ ] Check-ins can only be validated by administrators
- [ ] Gyms can only be registered by administrators;

## Non-Functional Requirements

- [x] User passwords need to be encrypted
- [x] Application data must be persisted in a PostgreSQL database
- [x] All data lists must be paginated with 20 items per page
- [ ] Users must be identified by a JWT (JSON Web Token)
