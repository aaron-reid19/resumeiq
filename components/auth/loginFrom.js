import { useState } from "react";
import { auth } from "@/firebase/config";

export default function LoginForm(){
    const [ email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setSuccess(true);

        const { user, error } = await login(email, password)
        if (error){
            setError(true);
            setLoading(false);
        }

        if (user){
            setError(false);
            setLoading(true);
        }

    }

    return(
        <div>
           <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="login-email">Email</label>
                <input 
                value={email}
                name="email"
                id="login-email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <label htmlFor="login-password">Email</label>
                <input 
                value={password}
                name="password"
                id="login-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            {error && (
                <div>{error}</div>
            )}
            
            <button 
                type="submit"
                disabled={loading}
            >
                {loading ? "Logging in" : "Log in"}
            </button>


           </form>
        </div>
    )
}
