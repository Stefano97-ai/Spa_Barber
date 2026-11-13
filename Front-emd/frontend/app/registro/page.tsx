"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
    const router = useRouter();
    const [formData, setFormData] = useState(
        {
            nombre: "",
            email: "",
            telefono: "",
            password: ""
        }
    );
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
        
    }
    return (
        <main>
            
        </main>
    )
}