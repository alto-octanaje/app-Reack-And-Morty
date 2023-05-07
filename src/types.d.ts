import { type } from "os";

export interface Sub {
  nick: string;
  subMonths: number;
  avatar: string;
  description?: string;

}
export type SubsResponseFromApi = Array<{
  name: string;
  id: number;
  image: string;
  created: string;
}>;
