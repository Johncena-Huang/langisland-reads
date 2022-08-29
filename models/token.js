const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
    default: Date.now,
    expires: "10m",
  },
});

module.exports = mongoose.model("Token", TokenSchema);

/*
*** Why "token" should have its own schema and model?
Ans: token is time-bound while the account isn't(If they are defined altogether, the whole
  account will be deleted after the time limit for verificaiton)
*** TTL index in mongodb(Time to live "feature")
→ A TTL index deletes a document 'x' seconds after its value (which should be a Date or an array of Dates) has passed.
  so it should be of "date type".
  Reference: https://stackoverflow.com/questions/24008956/time-to-live-in-mongodb-mongoose-dont-work-documents-doesnt-get-deleted
*** How to cancel expiration for TTL index?
The value for expires field can be toggled between a date and undefined(or null) as referenced below
When the value is set to a date, the countdown kicks in. The countdown freezes when the value is set to undefined or null.
  Reference: https://stackoverflow.com/questions/64387589/is-it-valid-practice-to-set-an-expire-at-field-to-null-to-cancel-expiration-in
*/
