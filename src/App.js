import "./App.css";
import { useState } from "react";

function App() {
  const [nurses, setNurses] = useState([]);

  const [isRegistryOpen, setIsRegistryOpen] = useState(false);

  const [selectedNurseId, setSelectedNurseId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [shifts, setShifts] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateShifts, setUpdateShifts] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateContact, setUpdateContact] = useState("");

  function registerHandler() {
    const id = Math.ceil(Math.random() * 10000).toString();

    const nurseDetailObj = {};

    nurseDetailObj.id = id;
    nurseDetailObj.name = name;
    nurseDetailObj.age = age;
    nurseDetailObj.shifts = shifts;
    nurseDetailObj.email = email;
    nurseDetailObj.contact = contact;
    // console.log(nurseDetailObj);

    const nurseDetails = nurses;
    nurseDetails.push(nurseDetailObj);

    setNurses(nurseDetails);
    // console.log(nurses);

    setIsRegistryOpen(true);

    setName("");
    setEmail("");
    setAge("");
    setShifts("");
    setContact("");
  }

  function okClose() {
    setIsRegistryOpen(false);
  }

  function deleteHandler(deleteNurse) {
    const remainingNurses = nurses.filter(
      (nurse) => nurse.id !== deleteNurse.id
    );
    setNurses(remainingNurses);
    // console.log(nurses);
  }

  function editHandler(nurse) {
    setSelectedNurseId(nurse.id);
    setIsModalOpen(true);

    setUpdateName(nurse.name);
    setUpdateAge(nurse.age);
    setUpdateShifts(nurse.shifts);
    setUpdateEmail(nurse.email);
    setUpdateContact(nurse.contact);
  }

  function updateHandler() {
    const id = selectedNurseId;
    const updatedNurseRegistry = nurses.map((nurse) => {
      if (nurse.id === id) {
        return {
          ...nurse,
          name: updateName,
          age: updateAge,
          shifts: updateShifts,
          email: updateEmail,
          contact: updateContact,
        };
      } else {
        return nurse;
      }
    });
    // console.log(updatedNurseRegistry);
    setNurses(updatedNurseRegistry);
    closeModal();
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openRegistry() {
    setIsRegistryOpen(true);
  }
  return (
    <>
      <div className="register-form">
        <h3>Register Here</h3>
        <label htmlFor="name">Enter Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          placeholder="Enter Name"
        />
        <label htmlFor="age">Enter Age</label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          id="age"
          type="number"
          placeholder="Enter Age"
        />
        <label htmlFor="weekly-shift">Enter Weekly Shifts</label>
        <input
          value={shifts}
          onChange={(e) => setShifts(e.target.value)}
          id="weekly-shifts"
          type="number"
          placeholder="Number Of Weekly Shifts"
        />
        <label htmlFor="email">Enter Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          placeholder="Enter Email"
        />
        <label htmlFor="contact">Enter Contact Number</label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          id="contact"
          type="number"
          placeholder="Enter Mobile No"
        />
        <button onClick={registerHandler} className="register">
          Register
        </button>
      </div>
      {isRegistryOpen ? (
        <div className="complete-registry-container">
          <h1>Nurse Registry : </h1>
          {nurses.map((nurse) => {
            return (
              <div key={nurse.id} className="nurse">
                <p>
                  Name : <span>{nurse.name}</span>
                </p>
                <p>
                  Age : <span>{nurse.age}</span>
                </p>
                <p>
                  Shifts : <span>{nurse.shifts}</span>
                </p>
                <p>
                  Email : <span>{nurse.email}</span>
                </p>
                <p>
                  Contact : <span>{nurse.contact}</span>
                </p>
                <button onClick={() => editHandler(nurse)} className="edit">
                  Edit
                </button>
                <button onClick={() => deleteHandler(nurse)} className="delete">
                  Delete
                </button>
              </div>
            );
          })}
          <button onClick={okClose} className="ok-close">
            Ok
          </button>
        </div>
      ) : null}
      {isModalOpen ? (
        <div className="modal">
          <div key={selectedNurseId} className="inner-modal">
            <label htmlFor="edit-name">Edit Name</label>
            <input
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              id="edit-name"
              type="text"
              placeholder="Edit Name"
            />

            <label htmlFor="edit-age">Edit Age</label>
            <input
              value={updateAge}
              onChange={(e) => setUpdateAge(e.target.value)}
              id="edit-age"
              type="text"
              placeholder="Edit Age"
            />

            <label htmlFor="edit-shifts">Edit Shifts</label>
            <input
              value={updateShifts}
              onChange={(e) => setUpdateShifts(e.target.value)}
              id="edit-shifts"
              type="number"
              placeholder="Edit Shifts"
            />

            <label htmlFor="edit-email">Edit Email</label>
            <input
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              id="edit-email"
              type="text"
              placeholder="Edit Email"
            />

            <label htmlFor="edit-contacts">Edit Contact</label>
            <input
              value={updateContact}
              onChange={(e) => setUpdateContact(e.target.value)}
              id="edit-contact"
              type="number"
              placeholder="Edit Contact"
            />

            <button onClick={updateHandler} className="update">
              Update
            </button>
            <button onClick={closeModal} className="cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      {isRegistryOpen ? null : (
        <button onClick={openRegistry} className="see-registry">
          Go Through Registry
        </button>
      )}
    </>
  );
}

export default App;
