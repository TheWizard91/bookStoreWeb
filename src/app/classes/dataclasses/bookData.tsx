export class BookData {
    id: number;
    title: string
    author: string;
    publicationYear: number;
    genres: string[];
    description: string;
    coverImage: string;
    longDescription: string;
    localCoverImagePath: string;
    stockCoverImagePath: string;
    price: number;
    rates: number

    constructor (
        id: number,
        title: string,
        author: string,
        publicationYear: number,
        genres: string[],
        description: string,
        coverImage: string,
        longDescription: string,
        localCoverImagePath: string,
        stockCoverImagePath: string,
        price: number,
        rates: number) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.publicationYear = publicationYear;
            this.genres = genres;
            this.description = description;
            this.coverImage = coverImage;
            this.longDescription = longDescription;
            this.localCoverImagePath = localCoverImagePath;
            this.stockCoverImagePath = stockCoverImagePath;
            this.price = price;
            this.rates = rates
        }
}