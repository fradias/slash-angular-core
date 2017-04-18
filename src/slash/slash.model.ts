export interface Slash {
  createdDate: string;
  id: string;
  isPrivate: boolean;
  members: any[];
  name: string;
  posts: any[];
  suspiciousness: number;
  updatedDate: string;

  /*constructor(data: any = {}) {

      this.createdDate = data.createdDate;
      this.id = data.id;
      this.isPrivate = data.isPrivate;
      this.members = data.members;
      this.name = data.name;
      this.posts = data.posts;
      this.suspiciousness = data.number;
      this.updatedDate = data.updatedDate;
  }*/
}
