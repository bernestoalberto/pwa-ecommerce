/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import Product from 'product';

   // constructor (sku, title, price, image, description='') {

// Normally you would get these from a server
export const products = [
   new Product('HOUSE', 'House sales notary services', 50.00, 'house.jpg','House notary services.'),
  new Product('WEDDING', 'Wedding Ceremony ', 100.00, 'wedding.jpg','Wedding ceremony celebration'),
  new Product('CAR', 'CARS', 75.00, 'tesla.jpg','Purchase or sale a car'),
  new Product('USCIS', 'USCIS', 40.00, 'uscis1.jpg','Inmigration services'),
  new Product('Notarized', 'Notarized Services', 50.00, 'notarizedSign.jpg','Notarized Services'),
  new Product('Notary', 'Other notary 1 services', 25.00, 'notary.jpg', 'Other Notary Services'),
 new Product('Notary1', 'Other notary 2 services', 25.00, 'nota1.jpg','Other Notary 1 Services'),
 new Product('Notary2', 'Other notary 3 services', 25.00, 'nota2.jpg', 'Other Notary 2 Services'),
 new Product('Notary3', 'Other notary 4 services', 25.00, 'nota3.jpg','Other Notary 3 Services'),
 new Product('Notary4', 'Other notary 5 services', 25.00, 'nota4.jpg', 'Other Notary Services'),
 new Product('Sealletter', 'Seal letter', 70.00, 'sailletter.jpg','Seal letter'),
 new Product('SheetBulk', 'Sheet Bulk', 69.00, 'sheet bulk.jpg', ' Sheet Bulk')
];

export function findProduct(sku, searchRange = products) {
  return searchRange.find(product => product.sku === sku);
}
