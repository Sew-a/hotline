import React, {useState, useEffect} from "react";
import axios from "axios";
import NewModal from "./modal/NewModal";

 const Api = () => {
    const [all, getAll] = useState([]);
    const [fName, setfName] = useState("");
    const [pass, setPass] = useState("");
    const [getID, setGetID] = useState("");

    const [showDataTarg, setShowDataTarg] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    (useEffect(() => {
        allUsers();
    },[] ));


    // ------------------- GET

    const allUsers =  () => {
        axios.get(`http://localhost:3001/users`)
            .then(res => {
                const allPersons = (res.data);
                getAll(allPersons);
                console.log(allPersons);
            })
    }

    // -----------------------SHOW

     const showUser = async (id) => {
         await axios.get(`http://localhost:3001/users/${id}`)
             .then(res => {
                 const tor = res.data;
                 // console.log(tor);
                 setShowDataTarg(tor);
             });
         setIsOpen(true);
     }

    //  --------------------  DELETE

    const deleteUser = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
            .then(res => {
                allUsers();
            })
    }

    // ---------------------------- POST


    const addUser = async () => {
      await  axios.post(`http://localhost:3001/users/`, {
            name: fName,
            password: pass,
            profession: "Developer",
        });
        setfName("");
        setPass("");
        allUsers();
        setIsOpen(false);
    }

    // -------------------------------- PUT

     const clickChangeUser = async () => {
         await axios.put(`http://localhost:3001/users/${getID}`, {
             name: fName.length ? fName : "Gaga",
             password: pass.length ? pass : "45454545",
             profession: "Developer",
             id: getID,
         });
         setfName("");
         setPass("");
         allUsers();
         setIsOpen(false);
     }

    const changeUser = (id) => {
        setIsOpen(true);
        setGetID(id);
    }


// DOM
return(
        <div className="table-section">
        <table>
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Pass</td>
                <td>Change</td>
                <td>Delete</td>
            </tr>
            </thead>
            <tbody>
                 {all.map(item => (
                     <tr key={item.id}>
                         <td onClick={() => showUser(item.id)}>{item.id}</td>
                         <td>{item.name}</td>
                         <td>{item.password}</td>
                         <td className="add" onClick={(e) => changeUser(item.id)}>Change</td>
                         <td className="delete" onClick={(e) => deleteUser(item.id, e)}>&#10006;</td>
                     </tr>
                 ))}
            </tbody>
        </table>
            <button onClick={()=> {setIsOpen(true)}} className="add_btn">ADD</button>
        {/*    MODAL  */}

            <NewModal open={isOpen} useName={showDataTarg} onClose={() => setIsOpen(false)}>
                <input placeholder="Name" value={fName} onChange={(e) => setfName(e.target.value)} />
                <input placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <div className="mod-buttons">
                    <button onClick={addUser} >Create User</button>
                    <button onClick={clickChangeUser} >Change User</button>
                </div>
            </NewModal>
        </div>
  );
};


export default Api;




