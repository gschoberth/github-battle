import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy, FaUser} from 'react-icons/fa'

function Instructions(){
    return(
        <div className='instructions-container'>
            <h1 className="center-text header-lg h1">
                Instructions
            </h1>
            <ol className="container-sm grid center-text battle-instructions ol">
                <li>
                    <h3 className="header-sm h3">Enter two Github users</h3>
                    <FaUserFriends className="bg-light FaUserFriends" color="rgb(255,191,116)" size={140}/>                    
                </li>
                <li>
                    <h3 className="header-sm h3">Battle</h3>
                    <FaFighterJet className="bg-light FaUserFriends" color="#727272" size={140}/>                    
                </li>
                <li>
                    <h3 className="header-sm h3">See the winners</h3>
                    <FaTrophy className="bg-light FaUserFriends" color="rgb(255,215,0)" size={140}/>                    
                </li>
            </ol>
        </div>
    )
}

export default class Battle extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Instructions />
            </React.Fragment>
        )
    }
}