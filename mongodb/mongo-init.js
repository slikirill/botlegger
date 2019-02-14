// db.auth('ll8U1hvnjki19NPMwyzIQGueVb8qAAOY', 'SVvHl14jYqfnQScRaRtsiiYdZ453jV7i')
use admin;

db.createUser(
  {
    user: "ll8U1hvnjki19NPMwyzIQGueVb8qAAOY",
    pwd: "SVvHl14jYqfnQScRaRtsiiYdZ453jV7i",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
use botlegger;
db.createUser(
    {
        user: "RNnaZfIMNn8PiDMYQh0EInnJks2Pkgag",
        pwd: "Xa6glORWWs3ZV5SMGB4zwOJZS2kP2wfn",
        roles: [
            {
                role: "readWrite",
                db: "botlegger"
            }
        ]
    }
);