import "./Auth.css";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../slices/authSlice";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword,
        };

        dispatch(register(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div id="register">
            <h2>Coder In</h2>
            <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique aqui</Link>
            </p>
        </div>
    );
};

export default Register;