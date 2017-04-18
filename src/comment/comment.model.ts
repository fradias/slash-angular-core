export interface Comment {
  anonymus: boolean;
  createdDate: string;
  id: string;
  link: string;
  suspiciousness: number;
  text: string;
  updatedDate: string;
  user: {id: string};
  post: {id: string};
}
