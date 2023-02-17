interface request {
  token: string;
  user: any;
}
interface Token {
  token: string;
  _id: string;
}

interface cookieOps{  
    expires:Date;
    secure?:boolean;
    httpOnly:boolean;
}

export { request };
export { Token };
export { cookieOps };
