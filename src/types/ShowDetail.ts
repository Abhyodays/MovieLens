export type ShowDetail = {
    id:string,
    title?:string,
    name?:string,
    poster_path:string,
    overview:string,
    genre_ids:number[],
    adult:boolean,
    media_type: string,
    release_date:string,
    runtime:number,
    vote_average:number,
    unique_id?:string
}