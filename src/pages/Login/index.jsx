import { Link } from "react-router-dom";

const Login = () => {

    return (
        <>
        <h1>
            <Link to="/Home" style={{ textDecoration: 'none', color: 'white' }}>
                Home
            </Link>
        </h1>
        </>
    )
}

export default Login;