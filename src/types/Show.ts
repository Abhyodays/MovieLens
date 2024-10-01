export type Show = {
    id:string,
    title?:string,
    name?:string,
    poster_path:string,
    overview:string,
    genre_ids:number[],
    adult:boolean,
    media_type: string,
}