import axios from "axios";
import React, { useState } from "react";
import { IContacts } from "../types/contacts";

export const useContacts = () =>{
    const [searchedContact, setSearchedContact] = useState<IContacts[]>([]);

    const searchByName = async (name:string) =>{
        const {data} = await axios.get<IContacts[]>(`http://localhost:3001/contacts?q=${name}`)
        setSearchedContact(data)
 
    }

    return {
        searchedContact,
        searchByName
    }

}