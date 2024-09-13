import { Show } from "./Show"

export type ApiResponse = {
    page:number,
    results:Show[],
    total_pages:number,
    total_results:number
}