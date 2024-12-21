import mongoose from 'mongoose'
const CandidateSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Age: { type: Number, required: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: String },
    LinkedInProfile: { type: String },
    ImageUrl: { type: String },
    Portfolio: { type: String }, // Link to personal portfolio or website
    Position: { type: String, required: true },
    Qualification: { type: String },
    ExpectedSalary: { type: Number },
    CurrentSalary: { type: Number },
    Address: { type: String },
    Progress: {
      type: String,
      enum: ['NotNeeded', 'Interviewed', 'Hired', 'Called', 'Offered', 'New'],
      default: 'New',
    },
    RejectionReason: { type: String }, // Reason for rejection if applicable
    OfferDetails: {
      OfferedSalary: { type: Number },
      JoiningDate: { type: Date },
      Status: {
        type: String,
        enum: ['Accepted', 'Declined', 'Pending'],
        default: 'Pending',
      },
    },
    Tags: [{ type: String }], // Skills or categories
    InterviewDate: { type: Date },
    InterviewFeedback: { type: String },
    Rating: { type: Number, min: 1, max: 5 },
    Notes: [
      {
        Comment: { type: String },
        AddedBy: {
          Name: { required: true, type: String },
          Email: { required: true, type: String },
        },
        AddedAt: { type: Date, default: Date.now },
      },
    ],
    Resume: { type: String }, // File URL or path for resume
    Source: {
      type: String,
      enum: [
        'LinkedIn',
        'Job Portal',
        'Employee Referral',
        'Direct Application',
      ],
      default: 'Direct Application',
    },
    UpdatedAt: { type: Date, default: Date.now },
    UpdatedBy: { type: String },
    IsActive: { type: Boolean, default: true }, // For soft delete functionality
    // Newly added fields

    ReferrerName: { type: String },
    ReferrerEmail: { type: String },

    LastContacted: { type: Date },
    ApplicationDate: { type: Date },
    StatusHistory: [
      {
        Status: { type: String },
        UpdatedAt: { type: Date, default: Date.now },
        UpdatedBy: { type: String },
      },
    ],
  },
  {
    timestamps: true, // Automatically includes `createdAt` and `updatedAt`
  }
)
const CandidateModel = mongoose.model('Candidate', CandidateSchema)
export default CandidateModel
