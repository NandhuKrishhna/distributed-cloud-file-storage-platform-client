import { CONFIG } from "./config";

export function devLog(error){
    if(CONFIG.ENV === "development"){
        console.log(error)
    }
}