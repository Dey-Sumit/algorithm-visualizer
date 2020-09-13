import React from 'react';
import { Card } from 'react-bootstrap';

const ArticleCard = ({ title, description, link, color }) => {
    return (
        <div>
            <a href={link}>
                <Card className="card_c mb-2" style={{ backgroundColor: `${color}` }}>
                    <Card.Header>{title}</Card.Header>
                    <Card.Body>

                        <Card.Text>
                            {description.slice(0, 45) + '...'}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </a>
        </div>

    );
};

export default ArticleCard;