import { useState } from "react";

const  Registration=()=>{

    const [form,setForm]=useState({
        email:"",
        password:"",
        firstName:"",
        lastName:"",
        gender:"",
        hobbies:""

    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);


       const handleChnage=(e)=>{
            console.log("Changed="+e.target.name);
            console.log("Changed="+e.target.value);
            setForm({
                ...form,
                [e.target.name]:e.target.value
            });
            setErrors((prev) => ({ ...prev, [e.target.name]: "" }));


       }; 
    
    const validate = () => {
        const nextErrors = {};
        const email = form.email.trim();
        const password = form.password.trim();
        const firstName = form.firstName.trim();
        const lastName = form.lastName.trim();
        const gender = form.gender.trim();
        const hobbies = form.hobbies.trim();

        if (!email) {
            nextErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            nextErrors.password = "Password is required.";
        } else if (password.length < 6) {
            nextErrors.password = "Password must be at least 6 characters.";
        }

        if (!firstName) {
            nextErrors.firstName = "firstName is required.";
        } 

        if (!lastName) {
            nextErrors.lastName = "lastName is required.";
        } 

        if (!gender) {
            nextErrors.gender = "gender is required.";
        } 

        if (!hobbies) {
            nextErrors.hobbies = "hobbies is required.";
        } 


        return nextErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        setStatus({ type: "", message: "" });
        if (Object.keys(nextErrors).length > 0) {
            return;
        }
        try {
            setIsSubmitting(true);
            const email = form.email.trim();
            const password = form.password.trim();
            const existingResponse = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
            if (!existingResponse.ok) {
                throw new Error("Registration lookup failed.");
            }
            const existingUsers = await existingResponse.json();
            if (existingUsers.length > 0) {
                setStatus({ type: "error", message: "Email already registered." });
                return;
            }

            const payload = {
                email,
                password,
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                gender: form.gender.trim(),
                hobbies: form.hobbies.trim()
            };

            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error("Registration failed.");
            }
            const savedUser = await response.json();
            console.log("Registered user:", savedUser);
            setStatus({ type: "success", message: "Registration successful. You can log in now." });
            setForm({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                gender: "",
                hobbies: ""
            });
        } catch (error) {
            setStatus({ type: "error", message: error.message || "Registration failed." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
           
        <form method="POST" onSubmit={handleSubmit} noValidate>
            <h2>Registration Form</h2>
            <div>
                <label>Emailid</label>
                <input type="text" name="email" value={form.email} onChange={handleChnage}/>
                {errors.email ? <div className="error">{errors.email}</div> : null}

            </div>

             <div>
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChnage}/>
                {errors.password ? <div className="error">{errors.password}</div> : null}
                
            </div>

            <div>
                <label>FirstName</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChnage}/>
                {errors.firstName ? <div className="error">{errors.firstName}</div> : null}

            </div>

            <div>
                <label>LastName</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChnage}/>
                {errors.lastName ? <div className="error">{errors.lastName}</div> : null}

            </div>

             <div>
                <label>Gender</label>
                <input type="radio" name="gender" value="Male" checked={form.gender==='Male'}   onChange={handleChnage}/>Male 
                 <input type="radio" name="gender" value="Female" checked={form.gender==='Female'}   onChange={handleChnage}/>Female
                {errors.gender ? <div className="error">{errors.gender}</div> : null}

            </div>

            <div>
                <label>Hobbies</label>
                <input type="radio" name="hobbies" value="Reading" checked={form.hobbies.includes('Reading')}   onChange={handleChnage}/>Reading 
                <input type="radio" name="hobbies" value="Travelling" checked={form.hobbies.includes('Travelling')}   onChange={handleChnage}/>Travelling
                <input type="radio" name="hobbies" value="Music" checked={form.hobbies.includes('Music')}   onChange={handleChnage}/>Music 
                <input type="radio" name="hobbies" value="Sports" checked={form.hobbies.includes('Sports')}   onChange={handleChnage}/>Sports 
                 
                {errors.hobbies ? <div className="error">{errors.hobbies}</div> : null}

            </div>


            {status.message ? <div className={status.type === "error" ? "error" : "success"}>{status.message}</div> : null}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
            </button>
        </form>

    );;
}


export default Registration;
