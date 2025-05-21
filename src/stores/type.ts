// types.ts
export interface defaultRedux {
  loading: boolean;
  error: string;
  success: string;
}

export interface UserState extends defaultRedux {
  draftValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface FormCardNfcState extends defaultRedux {
  draftValues: {
    nfc_card: string;
    school_id: string;
  };
}
