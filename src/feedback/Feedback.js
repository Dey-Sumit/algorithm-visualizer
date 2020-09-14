import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import firebase from 'firebase'
import './feedback.css'
const Feedback = () => {

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, about);
        db.collection("feedbacks").add(
            {
                name: name,
                about: about,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }
        )
        setName('')
        setAbout('')
    }
    return (
        <div className="feedback__form">
            <textarea name="" className="form__textField"
                placeholder=" Hey did you enjoy the app?🍧 Leave your feedback here...
                If you found any bug, please report it here ,that will be highly appreciated "

                required cols="90" rows="3" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
            <div className="form__dummyDiv">
                <input type="text" className="form__input"
                    placeholder="Your Name 😎 or be anonymous"
                    value={name} onChange={e => setName(e.target.value)} />
                <button className="form__button" onClick={handleSubmit}>Add</button>
            </div>
        </div>
    );
};

export default Feedback;