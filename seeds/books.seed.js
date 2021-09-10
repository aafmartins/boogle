require("../config/db");

const mongoose = require("mongoose");

const BookApi = require("../models/BookApi.model");

const book = [
  {
    kind: "books#volume",
    id: "H0taAAAAYAAJ",
    etag: "6BcBwL1CXWc",
    selfLink: "https://www.googleapis.com/books/v1/volumes/H0taAAAAYAAJ",
    volumeInfo: {
      title:
        "A Study of Income and Expenditures in Sixty Colleges. Year 1953-54",
      authors: [
        "National Federation of College and University Business Officers Associations",
      ],
      publishedDate: "1955",
      industryIdentifiers: [
        {
          type: "OTHER",
          identifier: "CORNELL:31924002268443",
        },
      ],
      readingModes: {
        text: false,
        image: false,
      },
      pageCount: 183,
      printType: "BOOK",
      categories: ["Universities and colleges"],
      maturityRating: "NOT_MATURE",
      allowAnonLogging: false,
      contentVersion: "0.1.1.0.preview.0",
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=H0taAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        thumbnail:
          "http://books.google.com/books/content?id=H0taAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      language: "en",
      previewLink:
        "http://books.google.de/books?id=H0taAAAAYAAJ&q=a&dq=a&hl=&as_pt=BOOKS&cd=17&source=gbs_api",
      infoLink:
        "http://books.google.de/books?id=H0taAAAAYAAJ&dq=a&hl=&as_pt=BOOKS&source=gbs_api",
      canonicalVolumeLink:
        "https://books.google.com/books/about/A_Study_of_Income_and_Expenditures_in_Si.html?hl=&id=H0taAAAAYAAJ",
    },
    saleInfo: {
      country: "DE",
      saleability: "NOT_FOR_SALE",
      isEbook: false,
    },
    accessInfo: {
      country: "DE",
      viewability: "NO_PAGES",
      embeddable: false,
      publicDomain: false,
      textToSpeechPermission: "ALLOWED",
      epub: {
        isAvailable: false,
      },
      pdf: {
        isAvailable: false,
      },
      webReaderLink:
        "http://play.google.com/books/reader?id=H0taAAAAYAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
      accessViewStatus: "NONE",
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet:
        "E /A A &#39;A A _ AV A A A AA <b>A</b> \\. A A A A A _ <b>A</b> _ _ <b>A</b> &#39; <b>A</b> _A A A A A A A A A <b>A</b>&#39; A A A J_ B A A AA <b>A</b> . <b>A</b> ~ AA A A I A _ <b>A</b>__A A fi_&#39; _AA A I A &#39;P A A AA A A A A I AA &#39;<b>A</b> &#39; <b>A</b> AA J <b>A</b>&#39; AA B A A A ~_ ~ &#39;AA AA _ A A A A _ . A A AA A  A ~ A I , <b>A</b> &#39;&nbsp;...",
    },
  },
];

BookApi.deleteMany()
  .then(() => {
    BookApi.create(book)
      .then((res) => {
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log("Could not create!", err);
      });
  })
  .catch((err) => {
    console.log("Could not delete!", err);
  });
