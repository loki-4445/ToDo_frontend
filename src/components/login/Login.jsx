import './Login.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Login() {
  let { register, handleSubmit } = useForm()
  let [err, setErr] = useState("")

  async function onLogin(data) {
    try {
      // Fetch users from the local API (this assumes you have an API returning user info)
      let res = await fetch(`http://localhost:4000/users?mob=${data.mob}&pass=${data.pass}`);
      let users = await res.json();

      if (users.length > 0) {
        console.log("Login successful");
        // Add your logic for successful login, e.g., redirect to a dashboard
        // navigate('/dashboard');
      } else {
        console.log("Invalid credentials");
        setErr("Invalid mobile number or password");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="box">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onLogin)}>
        <div className="input p-5">
          <input type="number" name="mob" id="mob" {...register('mob')} placeholder='Mobile' />
        </div>
        <div className="input">
          <input type="password" name="pass" id="pass" {...register('pass')} placeholder='Password' />
        </div>
        <button type="submit" className='p-2 text-white mt-5 mb-4 bg-success'>Login</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  )
}

export default Login;
