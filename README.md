# App

GymPass style app.

## Functional Requirements

- [ ] Users must be able to register
- [ ] Users must be able to authenticate;
- [ ] Users must be able to retrieve the profile of a logged-in user
- [ ] Users must be able to retrieve the number of check-ins performed by the logged-in user;
- [ ] Users must be able to retrieve their check-in history
- [ ] Users must be able to search for nearby gyms
- [ ] Users must be able to search for gyms by name
- [ ] Users must be able to check-in at a gym;
- [ ] Users must be able to validate their check-in;
- [ ] Gyms must be able to be registered

## Business Rules

- [ ] Users must not be able to register with a duplicate email
- [ ] Users cannot perform 2 check-ins on the same day;
- [ ] Users cannot check-in if they are not near (100m) the gym;
- [ ] Check-ins can only be validated up to 20 minutes after creation;
- [ ] Check-ins can only be validated by administrators
- [ ] Gyms can only be registered by administrators;

## Non-Functional Requirements

- [ ] User passwords need to be encrypted
- [ ] Application data must be persisted in a PostgreSQL database
- [ ] All data lists must be paginated with 20 items per page
- [ ] Users must be identified by a JWT (JSON Web Token)
