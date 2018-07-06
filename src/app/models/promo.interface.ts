import { extend } from 'lodash';
export class Promo {
  constructor(options = {}){
    extend(this,options);
  }
  description: string;
  id: string;
  image: string;
  name: string;
  price: string;
  title: string;
};