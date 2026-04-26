'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { Button } from "./button"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
    const {resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return null
    }
    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            {resolvedTheme === "dark" ? <Moon /> : <Sun />}
        </Button>
    )
}
