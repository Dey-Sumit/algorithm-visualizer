import React from 'react';
import ArticleCard from '../cards/ArticleCard';
import './articles.css'
const Articles = () => {
    return (
        <div className="articles__wrapper">
            <div className="articles">
                <h5 className="text-center mb-4">Popular Articles</h5>
                <ArticleCard color="#D452FD" title="Going Broad In A Graph: BFS Traversal" description="Throughout the course of this series, we’ve made connections between things."
                    link="https://medium.com/basecs/going-broad-in-a-graph-bfs-traversal-959bd1a09255"

                />
                <ArticleCard color="#D56031"

                    title="the most efficient sorting algorithm ?"
                    description="Bubble Sort vs Selection Sort vs Quick Sort. Write anything else that you can think of ?"
                    link="https://www.youth4work.com/Talent/analysis-of-algorithms/Forum/116021-which-is-the-most-efficient-sorting-algorithm"

                />
                <ArticleCard color="#32B777" title="Algorithms That Helped Define Mathematics"
                    description="Algorithms can be found in many fields in science. Having a long history, some are more influential than others."
                    link="https://interestingengineering.com/15-of-the-most-important-algorithms-that-helped-define-mathematics-computing-and-physics"

                />
            </div>
        </div>
    );
};

export default Articles;