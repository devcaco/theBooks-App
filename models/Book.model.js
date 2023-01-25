//  Add your code here
const { model, Schema } = require('mongoose');

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: 'Author', required: true }],
    genre: String,
    year: Number,
    format: {
      type: String,
      enum: ['Harcover', 'Paperback', 'Ebook', 'Audiobook'],
    },
    description: String,
    asin: String,
    pictureUrl: {
      type: String,
      default:
        'https://images.samsung.com/is/image/samsung/p6pim/us/ef-bt630pbeguj/gallery/us-galaxy-tab-s7-bt870-376786-ef-bt630pbeguj-507367124?$720_576_PNG$',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model('Book', bookSchema);
