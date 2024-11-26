import './Register.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Register() {
    let { register, handleSubmit } = useForm()
    let [registers, setRegister] = useState([])
    let [err, setErr] = useState("")

    async function onRegister(data) {
        console.log(data)
        setRegister([...registers, data])

        try {
            let res = await fetch("http://localhost:4000/users", { // Updated path for json-server
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            });
            let info = await res.json();
            if (info.message === "User created") {
                console.log("User created")
                // navigate('/login');
            } else if (info.message === "User already exists") {
                console.log("User exists")
                setErr("USER ALREADY EXISTS");
            } else {
                setErr(info.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="box">
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onRegister)}>
                <div className="input p-5">
                    <input type="number" name="mob" id="mob" {...register('mob')} placeholder='Mobile' />
                </div>
                <div className="input">
                    <input type="password" name="pass" id="pass" {...register('pass')} placeholder='Password' />
                </div>
                <button type="submit" className='p-2 text-white mt-5 mb-4 bg-success'>Register</button>
            </form>
            {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
    )
}

export default Register;
