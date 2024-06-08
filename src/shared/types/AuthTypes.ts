declare namespace AuthTypes {
  interface RequestRegistrationUser {
    // requried
    login: string;
    name: string;
    password: string;

    // other
    phone?: string;
    email?: string;
    mainImage?: CommonTypes.FileImagesTypes | undefined;

    // services
    confirmPassword?: string;
  }

  interface RequestLoginUser {
    login?: string;

    password?: string;

    phone?: string;
    code?: string;

    codeType?: 'sms' | 'call';
  }
}
