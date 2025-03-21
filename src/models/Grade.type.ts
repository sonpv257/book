export interface Grade {
    id: number;
    name: string;
    code: string;
  }  

 export interface GradeComboProps {
    globalValue?: string;
    onChange?: (value: string) => void;
    value?: string;
  }