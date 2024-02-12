import { useEffect } from 'react';
import type { WidgetConfig } from "@medusajs/admin"

const LoginCustomizationsWidget = () => {
    useEffect(() => {
        // remove logo
        document.querySelectorAll('.mb-large').forEach((DOMnode) => DOMnode.remove())
    }, [])
    
    return (            
        <div>
            <h1 className="inter-xlarge-semibold text-grey-90 text-[20px]" style={{ textAlign: 'center' }}>
                Log in to <br />
                <span className="text-4xl">Flagstaff Wholesale Admin</span>
            </h1>
        </div>
    )
}

export const config: WidgetConfig = {
    zone: "login.before",
}

export default LoginCustomizationsWidget