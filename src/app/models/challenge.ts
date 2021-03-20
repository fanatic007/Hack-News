export interface IChallenge{
  title: String;
  description: String;
  tags :String[];
  upvoters: String[];
  _id?:String;
  creationDate: Date;
}

export const DUMMY_CHALLENGE = {
  title: "Sudoku",
  description: "Create a Sudoku solver.",
  upvoters: ["HN1"],
  tags: [ "tech","algo"],
  _id: "YQNqsnwiBHK358gB",
  creationDate: new Date(new Date("June 25 1995 00:00"))
}