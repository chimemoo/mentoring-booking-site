/* eslint-disable no-unused-vars */
export interface ChipProps {
  email: string;
  onCloseClick: (val: string) => void;
}

export interface ChipListProps {
  emails: Array<string>;
  onCloseClick: (val: string) => void;
}

export interface OtherMailProps {
  emails: Array<string>;
  setEmails: (val: any) => void;
}
