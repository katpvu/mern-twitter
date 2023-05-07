import { useState, useEffect } from "react";
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { clearSessionErrors, signup } from "../../store/session";


const SignupForm = (props) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const errors = useSelector(state => state.errors.session)
    const state = useSelector(state => state)
    console.log(state)

    useEffect(() => {
        return () => {
          dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ username, email, password}))
    }

    return (
        <form onSubmit={handleSubmit}> 
            <h2>Sign Up</h2>
            <label> Username
                <div className="errors">{errors?.username}</div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>

            <label>Email
                <div className="errors">{errors?.email}</div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>Password
                <div className="errors">{errors?.password}</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <input type="submit" value="Sign Up" disabled={!email || !username || !password} />
        </form>
    );
};

export default SignupForm;