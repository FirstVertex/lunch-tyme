import { Contact } from './contact';
import { Location } from './location';

export interface Restaurant {
  name: string;
  backgroundImageURL: string;
  category: string;
  contact: Contact;
  location: Location;
}
