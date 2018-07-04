import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'lodash';
import { Product } from '../models/product.interface';
// import { Http, Headers } from '@angular/http';

@Injectable()
export class EmailsSenderService {
  // header: Headers;

  constructor(
    // private http: Http
  ) {
    emailjs.init('user_CNGJS3C30x3t5cljI0jQR');
    // token a27ff4fa4b50048f4da9e90999e3b21f
    // this.header=new Headers();
    // this.header.append('Authorization', `Basic ${btoa(environment.emailConfig.apiKey)}`);
    // this.header.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  }

  sendEmail(products) {
    let content = '';
    map(products, prod => {
      content += this.assambleProduct(prod);
    });

    emailjs.send('mailgun', 'checkout', {
      content: content,
      to: 'pandresascencao@gmail.com',
      from: 'pablo.ascencao@globant.com',
      company: 'MaterialesGa'
    })
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });

    // const url=`https://api.mailgun.net/v3/${environment.emailConfig.domain}/messages`;
    // return this.http.post(url, {
    //   text: `i hope this works ${products}`,
    //   from: 'you <pandresascencao@gmail.com>',
    //   to: 'Pablo Ascencao <pandresascencao@gmail.com>',
    //   subject: 'testing emailjs'
    // }, {headers: this.header});
    // function (err, message) {
    //   console.log(err || message);
    // });
  }
  assambleProduct(prod: Product) {
    const item = '<td><div class="mobile-full" style="display: inline-block; vertical-align: top; width: 100%; max-width: 184px;'
    + ' -mru-width: 0px; min-width: calc(33.333333333333336%); max-width: calc(100%); width: calc(304704px - 55200%);">'
      + '<table class="vb-content" border="0" cellspacing="9" cellpadding="0" style="border-collapse: separate; width: 100%; '
      + 'mso-cellspacing: 9px; border-spacing: 9px;" width="184" >'
        + '<tbody>'
          + '<tr>'
            + '<td width="100%" valign="top" align="center" class="links-color" style="padding-bottom: 9px;" >'
              + '<!--[if (lte ie 8)]> <div style="display: inline-block; width: 166px; -mru-width: 0px;" > <![endif]-->'
              + '<img alt="" border="0" hspace="0" align="center" vspace="0" width="166" height="90" '
              + 'style="border: 0px; display: block; vertical-align: top; height: auto; margin: 0 auto; color: #3f3f3f; font-size: 13px; '
              + 'font-family: Arial, Helvetica, sans-serif; width: 100%; max-width: 166px; height: auto;" src="' + prod.image + '" >'
              + '<!--[if (lte ie 8)]> </div><![endif]-->'
            + '</td>'
          + '</tr>'
          + '<tr>'
            + '<td width="100%" valign="top" align="left" style="font-weight: normal; color: #3f3f3f; '
            + 'font-size: 18px; font-family: Arial, Helvetica, sans-serif; text-align: left;" >'
              + '<span style="font-weight: normal;"> ' + prod.title + ' </span>'
            + '</td>'
          + '</tr>'
        + '</tbody>'
      + '</table>'
    + '</div></td>';
    return item;
  }
}