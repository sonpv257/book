export interface Grade {
    id: number;
    name: string;
    code: string;
  }  

 export interface GradeComboProps {
    gradeCode?: string;
    globalValue?: string;
    onChange?: (value: string) => void;
    value?: string;
  }