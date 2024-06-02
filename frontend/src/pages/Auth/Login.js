import "./Auth.css";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };
        dispatch(login(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const handleInputChange = () => {
        if (error) {
            dispatch(reset());
        }
    };

    return (
        <div id="login">
            <h2>Coder In</h2>
            <p className="subtitle">Faça o login para ver o que há de novo.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="E-mail"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                        handleInputChange();
                    }}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handleInputChange();
                    }}
                    value={password}
                />
                {!loading && <input type="submit" value="Entrar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
            </form>
            <p>
                Não tem uma conta? <Link to="/register">Clique aqui</Link>
            </p>
        </div>
    );
};

export default Login;