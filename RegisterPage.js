const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: "POST", // Required method
            headers: {
                "Content-Type": "application/json", // Required header attribute
            },
            body: JSON.stringify({ name, email, password }),
        });
        
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error during registration:", error);
    }
};
