// types.ts
export interface defaultRedux {
  loading: boolean;
  error: string;
  success: string;
  response: any;
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

export interface CancelSalesState extends defaultRedux {
  draftValues: {
    SchoolID: string; // school id
    sID: string; // sid userid
    sID2: string; // sid2 is employee id, คนขาย
    sSellID: string; // รหัสการซื้อขาย , transaction_id
  };
}

export interface CallSchoolListState extends defaultRedux {
  draftValues: {
    Array: {
      SchoolID: number; // school id
      SchoolName: string; // ชื่อโรงเรียน
      SchoolNameEN: string; // ชื่อโรงเรียน ภาษาอังกฤษ
    }[];
  };
}

export interface CallGetRegisterDeviceState extends defaultRedux {
  draftValues: {
    Array: {
      ID: number;
      SchoolID: number;
      DeviceID: string;
      UserID: number;
      NeedToUpdate: boolean;
      Tstamp: string;
      ResponseStatus: boolean;
    }[];
  };
}
