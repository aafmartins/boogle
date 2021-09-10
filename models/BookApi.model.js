const { Schema, model } = require("mongoose");

const bookApiSchema = new Schema({
  kind: String,
  id: String,
  etag: String,
  selfLink: String,
  volumeInfo: {
    title: String,
    authors: [String],
    publishedDate: String,
    industryIdentifiers: [
      {
        type: { type: String },
        identifier: String,
      },
    ],
    readingModes: {
      text: Boolean,
      image: Boolean,
    },
    pageCount: Number,
    printType: String,
    categories: [String],
    maturityRating: String,
    allowAnonLogging: Boolean,
    contentVersion: String,
    panelizationSummary: {
      containsEpubBubbles: Boolean,
      containsImageBubbles: Boolean,
    },
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String,
    },
    language: String,
    previewLink: String,
    infoLink: String,
    canonicalVolumeLink: String,
  },
  saleInfo: {
    country: String,
    saleability: String,
    isEbook: Boolean,
  },
  accessInfo: {
    country: String,
    viewability: String,
    embeddable: Boolean,
    publicDomain: Boolean,
    textToSpeechPermission: String,
    epub: {
      isAvailable: Boolean,
    },
    pdf: {
      isAvailable: Boolean,
    },
    webReaderLink: String,
    accessViewStatus: String,
    quoteSharingAllowed: Boolean,
  },
  searchInfo: {
    textSnippet: String,
  },
});

const BookApi = model("BookApi", bookApiSchema);

module.exports = BookApi;
