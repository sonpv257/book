export interface Category {
    id: number;
    name: string;
    code: string;
  }  

  export interface CategoryComboProps {
    globalValue?: string;
    onChange?: (value: string) => void;
    value?: string;
  }
  