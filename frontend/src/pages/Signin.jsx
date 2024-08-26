import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
const Signin = () => {
  const [FormData,setFormData] = useState({});
  const [Error,setError] = useState(null);
  const [Loading,setLoading] =useState(false);
  const navigate = useNavigate();

  const handleChange =(e)=>{
      setFormData(
        {
          ...FormData,
          [e.target.id] : e.target.value
        }
      )
  }
  // console.log(FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData), // Ensure FormData is correctly defined
      });
  
      // if (!response.ok) {
      //   const errorText = await response.text();
      //   throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      // }
  
      const data = await response.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/');
      console.log(data);

    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
    }
  };

  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
      <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
      <button disabled={Loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>{Loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {Error && <p className="text-red-500 mt-5">{Error}</p>}
    </div>
  )
}

export default Signin