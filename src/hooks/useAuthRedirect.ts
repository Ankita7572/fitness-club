// hooks/useAuthRedirect.ts
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import app from '@/lib/firebase/config'

export function useAuthRedirect(redirectPath: string = '/onboarding') {
    const router = useRouter()

    useEffect(() => {
        const auth = getAuth(app)
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace(redirectPath)
            }
        })
        return () => unsubscribe()
    }, [router, redirectPath])
}