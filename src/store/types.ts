export interface Comment {
    id: number;
    title: string;
    body: string;
  }
  
  export interface AppState {
    data: any;
    comments: Comment[];
    ratings: Record<number, number>;
    loading: boolean;
    error: string | null;
  }
  