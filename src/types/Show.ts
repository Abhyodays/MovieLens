export type Show = {
    id:number,
    title?:string,
    name?:string,
    poster_path:string,
    overview:string,
    genre_ids:number[],
    adult:boolean,
    media_type: string,
}