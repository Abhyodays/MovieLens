import { Rating } from "./Rating"
import { Show } from "./Show"

export type ApiResponse = {
    page:number,
    results:Show[],
    total_pages:number,
    total_results:number
}

export type RatingResponse = {
    page:number,
    results:Rating[],
    total_pages:number,
    total_results:number
}