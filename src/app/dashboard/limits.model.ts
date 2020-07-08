import {firestore} from 'firebase';

export class Limit {
    public $id: string;
    public country: string;
    public countryEng: string;
    public continent: string;
    public summary: string;
    public news: string;
    public time: firestore.Timestamp;
    public timeUi: Date;
    public userId: string;
    public imagePath: string;
    public image: string;

    constructor($id: string, country: string, countryEng: string, continent: string, summary: string, news: string,
                time: firestore.Timestamp,
                userId: string, imagePath: string, image: string) {
        this.$id = $id;
        this.country = country;
        this.countryEng = countryEng;
        this.continent = continent;
        this.summary = summary;
        this.news = news;
        this.time = time;
        this.timeUi = time.toDate();
        this.userId = userId;
        this.imagePath = imagePath;
        this.image = image;
    }
}
