import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'lodash';
import { Product } from '../models/product.interface';
import * as emailjs from 'emailjs-com';

@Injectable()
export class EmailsSenderService {

  constructor(
  ) {
    emailjs.init(environment.emailConfig.key);
  }

  sendEmail(products, config) {
    let content = '';
    map(products, (prod, index) => {
      // content += !(index % 2) ? '<tr style="margin-top: 15px; border-top: 1px solid #30bed6;">'
      //  + this.assambleProduct(prod) : this.assambleProduct(prod) + '</tr>';
      content += this.assambleProduct(prod);
    });
    config.content = content;
    return emailjs.send('mailgun', 'checkout', config)
  }
  assambleProduct(prod: Product) {
    const item = '<span style="display: block; width: 100%; margin-bottom: 10px; border: 1px solid #444; padding: 5px; background: #fff;">'
        + '<img style="float: left; width: 30%; margin-right: 10px;" src="' + prod.image + '" alt="" />'
        + '<span>'
          + '<h6 style="margin: 0 0 5px; font-size: 16px;" >' + prod.title + '</h6>'
          + (prod.shortDescription ? '<p style="margin: 7px 0; font-size: 12px;" > ' + prod.shortDescription + ' </p>' : '')
          + (prod.price ? '<span style="font-size: 10px; color: #30bed6;">$'+ prod.price + '</span>': '')
        + '</span>'
      + '</span>';
    return item;
  }
}