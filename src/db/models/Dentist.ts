const mongoose = require("mongoose");

const DentistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    yearsOfExperience: {
      type: Number,
      required: [true, "Please add years of experience"],
      min: [0, "Experience cannot be negative"],
    },
    areaOfExpertise: {
      type: String,
      required: [true, "Please add an area of expertise"],
      trim: true,
    },
    picture: {
      type: String,
      required: [true, "Please add a picture URL"], // This could be a URL or file path
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

  const Dentist = mongoose.models.Dentist || mongoose.model("Dentist",DentistSchema)
  export default Dentist

  