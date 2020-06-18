import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(private http: HttpClient) {
    }

    postData(name: String, email: String, text: String) {
        const body = '<p><strong>Email отправитель</strong>:' + name + '</p>\n' +
            '<p><strong>Имя отправителя</strong>: ' + email + '</p>\n' +
            '<p><strong>Предложение: </strong>' + text + '</p>';

        const url = 'https://api.elasticemail.com/v2/email/send?apikey=488C0AA0D9EC6D75B0A0DD0064DF879E057E9171EB7F39690B35B8B2E3ED0C1C5DC5CD9DA509FAE4299C321347FC82E3&' +
            'from=margooowa91@gmail.com&fromName=Предложения с сайта&' +
            'bodyHtml=' + encodeURIComponent(body) + '&subject=Змечания&' +
            'to=travel.limits.org@gmail.com&isTransactional=true'
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Method': 'GET,POST,OPTIONS,DELETE,PUT',
        //         // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        //         'Access-Control-Allow-Credentials': 'true'
        //     })
        // };
        return this.http.post(url, null);
    }
}
