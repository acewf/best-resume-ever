import yaml from 'js-yaml';
import { PERSON } from '../../resume/data.yml';
import { terms } from '../terms';


console.log('CONTACT_PHONE:', process.env);

// Called by templates to decrease redundancy
function getVueOptions(name) {
    const opt = {
        name: name,
        data() {
            const person = yaml.load(PERSON);
            person.contact.email = process.env.CONTACT_EMAIL;
            person.contact.phone = process.env.CONTACT_PHONE;
            person.contact.street = process.env.CONTACT_ADDRESS;
            person.page1 = person.experience.slice(0, 6);
            person.page2 = person.experience.slice(7, person.experience.length);
            return {
                person: person,
                terms: terms,
            };
        },
        computed: {
            lang() {
                const defaultLang = this.terms.en;
                const useLang = this.terms[this.person.lang];

                // overwrite non-set fields with default lang
                Object.keys(defaultLang)
                    .filter(k => !useLang[k])
                    .forEach(k => {
                        useLang[k] = defaultLang[k];
                    });

                return useLang;
            },

            contactLinks() {
                const links = {};

                if (this.person.contact.github) {
                    links.github = `https://github.com/${this.person.contact.github}`;
                }

                if (this.person.contact.codefights) {
                    links.codefights = `https://codefights.com/profile/${this.person.contact.codefights}`;
                }

                if (this.person.contact.medium) {
                    links.medium = `https://medium.com/@${this.person.contact.medium}`;
                }

                if (this.person.contact.email) {
                    links.email = `mailto:${this.person.contact.email}`;
                }

                if (this.person.contact.linkedin) {
                    links.linkedin = `https://linkedin.com/in/${this.person.contact.linkedin}`;
                }

                if (this.person.contact.phone) {
                    links.phone = `tel:${this.person.contact.phone}`;
                }

                return links;
            },
        }
    };
    return opt;
}

export {
    getVueOptions
};
