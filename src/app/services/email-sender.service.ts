import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'lodash';
import { Product } from '../models/product.interface';

@Injectable()
export class EmailsSenderService {

  constructor(
  ) {
    emailjs.init('user_CNGJS3C30x3t5cljI0jQR');
  }

  sendEmail(products, config) {
    let content = '';
    map(products, (prod, index) => {
      content += !(index % 2) ? '<tr style="margin-top: 15px; border-top: 1px solid #30bed6;">'
       + this.assambleProduct(prod) : this.assambleProduct(prod) + '</tr>';
    });
    config.content = content;
    return emailjs.send('mailgun', 'checkout', config)
  }
  assambleProduct(prod: Product) {
    const item = '<td style="border: 1px solid #444; padding: 5px; background: #fff;">'
      + '<img style="float: left; width: 30%; margin-right: 10px;" src="' + prod.image + '" alt="" />'
      + '<h6 style="margin: 0 0 5px; font-size: 16px;" >' + prod.title + '</h6>'
      + (prod.shortDescription ? '<p style="margin: 7px 0; font-size: 12px;" > ' + prod.shortDescription + ' </p>' : '')
      + '</td>';
    return item;
  }
}