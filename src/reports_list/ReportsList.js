import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import './reportsList.css'



const ReportsList = () => {

    const [feedbacks, setFeedbacks] = useState([])
    useEffect(() => {
        db.collection('feedbacks').orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setFeedbacks(snapshot.docs.map(doc =>
                    ({
                        id: doc.id,
                        data: doc.data()
                    })
                ))
            })
    }, [])


    return (
        <div className="reportedList">
            {
                feedbacks.map(({ id, data: { name, about, timestamp } }) =>
                    <Card className="feedbackCard" key={id}>
                        <Card.Header className="feedbackCard__header">{name ? name : "Anonymous"}{' '}
                            <small className="ml-2">{new Date(timestamp?.toDate()).toDateString()}</small></Card.Header>
                        <Card.Body className="feedback__body">
                            {about}
                        </Card.Body>
                    </Card>
                )
            }
        </div>
    )
};

export default ReportsList;