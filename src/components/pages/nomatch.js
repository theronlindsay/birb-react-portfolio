import React, {Component} from 'react';
import { Link } from 'react-router-dom';

    export default function(){
        return(
            <div>
                <h2>Page Cannot be Found ):</h2>
                <Link to = "/">Return to Homepage</Link>
            </div>
    );
}