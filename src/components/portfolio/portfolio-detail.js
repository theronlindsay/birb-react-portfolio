import React, {Component} from 'react';

    export default function(props){
        return(
            <div>Portfolio Detail for {props.match.params.slug}</div>
    );
}