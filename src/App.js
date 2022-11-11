import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Box, Button, CircularProgress, Modal} from "@mui/material";
import {Send} from "@mui/icons-material";
import {addDiary, getDiary, removeDiary, selectDiary} from "./features/diary/diarySlice";
import {useDispatch, useSelector} from "react-redux";
import no from "./media/no_god_please_no.mp3";

function App() {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [country, setCountry] = useState("Kyrgyzstan");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [countrys, setCountrys] = useState([]);
    const noGod = new Audio(no);

    const diary = useSelector(selectDiary)

    const handleAdd = async () => {
        await dispatch(addDiary({
            id: Object.values(diary).length + 1,
            date: date,
            country: country,
            message: message
        }))
        dispatch(getDiary())
    };

    const handleDelete = async (key) => {
        await dispatch(removeDiary(key));
        dispatch(getDiary());
        setModal(false)
        noGod.pause()
    }

    useEffect(() => async () => {
        const {data} = await axios.get("https://restcountries.com/v3.1/all")
        const c = data.map(c=>c.name.common);
        setCountrys(c)
        dispatch(getDiary())
    },[]);
  return (
    <div className="App">
        <div className="top">
            <ul className="diarys">
                {diary
                    ? Object.keys(diary).map(e=><li key={e}>
                        <div><span>Post <span>#{diary[e].id}</span> at <span>{diary[e].date}</span> being in: <span>{diary[e].country}</span></span><button onClick={()=>setModal(true)}>Remove</button></div>
                        {diary[e].message}
                        <Modal open={modal} onClose={()=> {
                            setModal(false)
                            noGod.pause()
                        }}>
                            <Box className="delete">
                                <h3>Delete?</h3>
                                <span>
                                    <Button onClick={()=>handleDelete(e)} variant="contained" color="success"  onMouseOver={()=>noGod.play()}>yes</Button>
                                    <Button onClick={()=> {
                                        setModal(false)
                                        noGod.pause()
                                    }} variant="contained" color="error">no</Button>
                                </span>
                            </Box>
                        </Modal>
                    </li>)
                    : <CircularProgress style={{marginTop: 100}} color="inherit"/>}
            </ul>
        </div>
        <div className="bottom">
            <select style={{width: 150}} onClick={e=>setCountry(countrys[e.target.selectedIndex])}>
                {countrys.map((e, key) => <option key={key}>{e}</option>)}
            </select>
            <input type="date" onSelect={e => setDate(e.target.value)}/>
            <textarea cols="30" rows="5" onChange={e=>setMessage(e.target.value)} value={message} placeholder="Message"/>
            <button onClick={handleAdd}>
                <Send/>
            </button>
        </div>
    </div>
  );
}

export default App;
