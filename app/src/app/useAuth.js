import React, { useEffect, useState } from "react";
import axios from "axios";


function useAuth({user , setuser}) {
    const id = localStorage.getItem("userID");

    async function getUser() {
        try {
            await axios.get(`/user/${id}`).then((res) => {
                setuser(res.data);
            });
        } catch (error) {
            console.error("User not found")
        }
    }

    useEffect(() => {
        getUser();
    }, []);
}

export default useAuth