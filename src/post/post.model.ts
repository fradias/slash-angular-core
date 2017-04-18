export interface Post {
  anonymus: boolean;
  comments: any[];
  createdDate: string;
  id: string;
  image: string;
  likes: any[];
  slashes: any[];
  suspiciousness: number;
  text: string;
  updatedDate: string;
  views: number;
  votes: number;
  user: {id: string;};


}
