export interface SignatureType {
  id: string;
  firstName: string;
  lastName: string;
  guilminTitle?: string;
  peintagoneTitle?: string;
  phone?: string;
  avatar?: {
    file: {
      url: string;
    };
  };
  color?: string;
}
