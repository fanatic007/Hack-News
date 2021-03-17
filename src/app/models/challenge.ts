export interface IChallenge{
  title: String;
  description: String;
  tags :String[];
  upvotes: number;
  _id?:String;
  creationDate: Date;
}

export const DUMMY_CHALLENGE = {
  title: "Sudoku",
  description: "Create a Sudoku solver.",
  upvotes: 2,
  tags: [ "tech","algo"],
  _id: "YQNqsnwiBHK358gB",
  creationDate: new Date()
}