//  Add your code here
const { model, Schema } = require('mongoose');

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: {
      type: String,
      enums: ['Male', 'Female'],
    },
    email: String,
    pictureUrl: {
      type: String,
      default:
        'https://w7.pngwing.com/pngs/498/275/png-transparent-silhouette-user-person-silhouette-cdr-animals-head.png',
    },
    catchPhrase: String,
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model('Author', authorSchema);
