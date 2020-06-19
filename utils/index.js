import { useMemo, useState, useEffect } from "react"
export function parseToken(token) {
    if(typeof token !== "string") return undefined
    var parts = token.split('.')
    if(parts.length !== 3) return undefined
    try {
        return JSON.parse(atob([parts[1]]))
    } catch {
        return undefined
    }
}