import {IHeader} from './IHeader'

export interface IReqeust {
    Id: number;
    Url: string;
    Uri: string;
    Body: string;
    Headers: IHeader[];
}