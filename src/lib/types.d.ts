interface Token {
   token: string;
   _id: string;
}

interface cookieOps {
   expires: Date;
   secure?: boolean;
   httpOnly: boolean;
}

interface User {
   name: string;
   age: string;
   number: number;
   gender: 'male' | 'female' | 'better not say';
   DOB: Date;
   email: string;
}

interface dbUser extends User {
   readonly _id: string;
   password: string;
}

export { Token, cookieOps, User, dbUser };
