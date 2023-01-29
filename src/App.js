import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    console.log(name)
    const newUser = { name };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser)
    })
      .then((response) => response.json())
      .then((data) => {
        const user = [...users,data]
        setUsers(user)
      })
      .catch((err) => console.log(err));

    form.reset();
  };

  const handleDelete = user => {
    const agree = window.confirm(user.name)
    if(agree){
      fetch(`http://localhost:5000/users/${user._id}`,{
        method:"DELETE"
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.deletedCount){
          window.confirm("Delete Success", data.name)
          const remaining = users.filter(usr => usr._id !== user._id)
          setUsers(remaining)
        }
      })
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleNameSubmit}>
        <input type="text" name="name" placeholder="Write ur name here" required />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <h4>{users.length}</h4>
        {users.map((user) => (
          <div>
            <p key={user._id}>{user.name}</p>
            <button onClick={() => handleDelete (user)}>Delete</button>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default App;
