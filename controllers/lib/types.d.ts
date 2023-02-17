interface Token {
  token: string;
  _id: string;
}

interface cookieOps{  
    expires:Date;
    secure?:boolean;
    httpOnly:boolean;
}

export { Token };
export { cookieOps };
