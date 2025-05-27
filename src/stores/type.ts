// types.ts
export interface DefaultRedux {
  loading: boolean;
  error: string;
  success: string;
  response: any;
}

export interface UserState extends DefaultRedux {
  draftValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface FormCardNfcState extends DefaultRedux {
  draftValues: {
    nfc_card: string;
    school_id: string;
  };
}

export interface CancelSalesState extends DefaultRedux {
  draftValues: {
    SchoolID: string; // school id
    sID: string; // sid userid
    sID2: string; // sid2 is employee id, คนขาย
    sSellID: string; // รหัสการซื้อขาย , transaction_id
  };
}

export interface CallSchoolListState extends DefaultRedux {
  draftValues: {
    Array: {
      SchoolID: number; // school id
      SchoolName: string; // ชื่อโรงเรียน
      SchoolNameEN: string; // ชื่อโรงเรียน ภาษาอังกฤษ
    }[];
  };
}

export interface CallGetRegisterDeviceState extends DefaultRedux {
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

export interface ResponseGetRegisterOnlineDevice extends DefaultRedux {
  draftValues: {
    Array: {}[];
  };
}

export interface CallPostOnlineDevice extends DefaultRedux {
  draftValues: {
    SchoolID: number;
    DeviceID: string;
    Status: string;
  };
}
