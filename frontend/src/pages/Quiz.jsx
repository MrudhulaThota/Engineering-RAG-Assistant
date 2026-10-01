import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Quiz() {

    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [quiz, setQuiz] = useState("");

    async function generateQuiz() {

        try {

            const response = await api.post("/quiz/", {

                topic,

                difficulty,

                number_of_questions:10

            });

            setQuiz(response.data.quiz);

        }

        catch(err){

            alert(err.response?.data?.detail || err.message);

        }

    }

    return (

        <>

            <Navbar/>

            <div style={{display:"flex"}}>

                <Sidebar/>

                <div style={{padding:30,flex:1}}>

                    <h1>AI Quiz Generator</h1>

                    <input

                        placeholder="Enter Topic"

                        value={topic}

                        onChange={(e)=>setTopic(e.target.value)}

                        style={{
                            width:"60%",
                            padding:10
                        }}

                    />

                    <select

                        value={difficulty}

                        onChange={(e)=>setDifficulty(e.target.value)}

                        style={{
                            marginLeft:15,
                            padding:10
                        }}

                    >

                        <option>Easy</option>

                        <option>Medium</option>

                        <option>Hard</option>

                    </select>

                    <button

                        onClick={generateQuiz}

                        style={{
                            marginLeft:15,
                            padding:"10px 20px"
                        }}

                    >

                        Generate Quiz

                    </button>

                    <hr/>

                    <pre
                        style={{
                            whiteSpace:"pre-wrap",
                            background:"#f7f7f7",
                            padding:20
                        }}
                    >

                        {quiz}

                    </pre>

                </div>

            </div>

        </>

    )

}