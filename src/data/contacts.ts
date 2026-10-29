export type CompanyContact = {
  email: string;
  phone: string;
  tel: string;
  regionEn: string;
  regionEs: string;
  primary?: boolean;
};

export const companyContacts: CompanyContact[] = [
  {
    email: 'chaozhengzong7@gmail.com',
    phone: '+86 133 7362 3030',
    tel: '+8613373623030',
    regionEn: 'China',
    regionEs: 'China',
    primary: true,
  },
  {
    email: 'zongsuyun@gmail.com',
    phone: '+52 667 821 4311',
    tel: '+526678214311',
    regionEn: 'Mexico',
    regionEs: 'México',
  },
];

export const primaryContact = companyContacts[0];
