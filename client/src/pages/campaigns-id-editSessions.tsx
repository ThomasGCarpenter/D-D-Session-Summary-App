import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom" 
import axios from 'axios';

function Editstudentdetails(props: any) {
    const [getStudentDataById,setStudentDataById] = useState({})

    const { id } = useParams()

    const getDataById = async() => {
        try {
            const result = await axios.get(`http://localhost:9444/campaigns/id/editSessions`)
            setStudentDataById(result.data)
            console.log(result.data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataById()
    }, [])

    const handleChange = ({ target }: { target:any }) => {
        const { name, value } = target
    }
    return (
        <div>
            <button></button>
        </div>
        )
    }

export default Editstudentdetails