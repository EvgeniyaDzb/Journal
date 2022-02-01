import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Box from "../box/Box";
// import PostItem from './PostItem';
import './AnimatedListTransition.css'

const AnimatedList = (props) => {
    if (!props.items.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>
                List empty
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {props.title}
            </h1>
            <TransitionGroup>
                {props.items.map((item, index) =>
                    <CSSTransition
                        key={item.id}
                        timeout={500}
                        classNames='post'
                    >
                    {props.render(item, index)}
                   </CSSTransition>
                )}

            </TransitionGroup>
        </div>
    );
};

export default AnimatedList;