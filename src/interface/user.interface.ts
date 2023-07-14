export interface IUser {
  id: string;
  username: string;
  age: number;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  companyName: string;
  isRemoved?: boolean;
}
