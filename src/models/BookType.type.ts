export interface BookType {
    id: number;
    code: string;
    name: string;
  }

  export interface BookTypeComboProps {
    globalValue?: string;
    onChange?: (value: string) => void;
    value?: string;
  }