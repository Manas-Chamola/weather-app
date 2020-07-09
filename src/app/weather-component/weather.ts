export class Weather {
  constructor(
    public name?: String,
    public img?: String,
    public weather?: [
      {
        id?: number;
        main?: String;
        description?: String;
        icon?: String;
      }
    ],
    public main?: {
      temp?: number;
      pressure?: number;
      humidity?: number;
      temp_min?: number;
      temp_max?: number;
    },
    public error?: String
  ) {}
}
