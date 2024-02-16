import {useState} from "react";
import {Link} from "react-router-dom";
import OutputContainer from "../components/OutputContainer";
import {PostCall} from "../ApiCalls";

function SubmitStudent() {
    const [output, setOutput] = useState({nic: "", name: "", grade: "", contact: ""});
    const [student, setStudent] = useState({nic: "", name: "", grade: "", contact: ""});
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        setResponseMessage("");
        setErrMessage("");
        setStudent((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleCheckOut() {
        setErrMessage("");
        setResponseMessage("");
        if (!/^\d{10}$/.test(student.nic)) {
            setErrMessage("Student NIC number must contain exactly 10 digits.");
            document.getElementById("nic").focus();
            return;
        } else if (!/^[A-Za-z][A-Za-z ]+$/.test(student.name)) {
            setErrMessage("Student name is empty or invalid");
            document.getElementById("name").focus();
            return;
        } else if (student.grade === "" || isNaN(student.grade) || student.grade < 0 || student.grade > 100) {
            setErrMessage("Student grade must be a number between 0 and 100");
            document.getElementById("grade").focus();
            return;
        } if (!/^0\d{10}$/.test(student.contact)) {
            setErrMessage("Student contact number must start with '0' followed by 10 digits.");
            document.getElementById("contact").focus();
            return;
        }        
        setOutput({nic: student.nic, name: student.name, grade: student.grade, contact: student.contact});
        setStudent({nic: "", name: "", grade: "", contact: ""});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");
        if (!output.nic || !output.name || !output.grade || !output.contact) {
            setErrMessage("Inputs didn't checked out");
            return;
        }
        try {
            const response = await PostCall(output);
            setResponseMessage("Student successfully submitted to the database");
        }
        catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message);
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        }
        finally {
            setOutput({nic: "", name: "", grade: "", contact: ""});
        }
    }

    return (
        <div className={"centered-element"}>
            <img className="student-img" src={"https://cdn-icons-png.flaticon.com/512/5349/5349022.png"} width={"120px"} alt={"user-logo"}/>
            <div className="student-container">
                <h1>Submit Student</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={student.nic} id="nic" name="nic" placeholder="Enter NIC Number" />
                    <input onChange={handleChange} value={student.name} id="name" name="name" placeholder="Enter Name" />
                    <input onChange={handleChange} value={student.grade} id="grade" name="grade" placeholder="Enter grade" />
                    <input onChange={handleChange} value={student.contact} id="contact" name="contact" placeholder="Enter Contact" />
                    <h5>{errMessage}&nbsp;</h5>
                    <br/>
                    <button onClick={handleCheckOut} type={"button"}>Check Out</button>
                    <button type={"submit"}>Submit Student</button>
                    <Link className={"back-link"} to='/dashboard'>Back</Link>
                </form>
                <br/>
                <OutputContainer
                    nic={output.nic}
                    name={output.name}
                    grade={output.grade}
                    contact={output.contact}
                />
                <br/>
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default SubmitStudent;