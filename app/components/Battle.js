import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy, FaUser, FaTimesCircle} from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'

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

class PlayerInput extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)

        this.handleChange = this.handleChange.bind(this)
        
    }

    handleSubmit(event){
        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }



    handleChange(event){
        this.setState({
            username: event.target.value
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="column player">
                <label htmlFor='username' className='player-label'>
                    {this.props.label}
                </label>
                <div className="row player-inputs div">
                    <input 
                        type='text' 
                        id='username' 
                        className='input-light' 
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.handleChange}
                     />
                     <button 
                        className="btn dark-btn"
                        type='submit'
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

PlayerInput.propTypes ={
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({username, onReset, label}){
    return(
        <div className="column player div">
            <h3 className="player-label h3">{label}</h3>
            <div className="row bg-light div">
                <div className="player-info div">
                    <img 
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                        className="avatar-small"
                    />
                    <a
                        href={`https://github.com.${username}`}
                        className='link'
                    >
                        {username}
                    </a>
                </div>
                <button className="btn-clear flex-center button" onClick={onReset}>
                    <FaTimesCircle color='rgb(194,54,42)' size={26} />
                </button>
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleSubmit(id, player){
        this.setState({
            [id]: player
        })
    }

    handleReset(id){
        this.setState({
            [id]: null
        })
    }



    render(){
        const { playerOne, playerTwo, battle} = this.state

        if( battle === true){
            return(
                <Results 
                    playerOne={playerOne} 
                    playerTwo={playerTwo} 
                    onReset={()=> this.setState({
                        playerOne: null,
                        playerTwo: null,
                        battle: false
                    })}
                />
            )    
        }    

        return(
            <React.Fragment>
                <Instructions />

                <div className="players-container div">
                    <h1 className="center-text header-lg h1">Players</h1>
                    <div className="row space-around div">
                        {playerOne === null 
                            ?<PlayerInput 
                                label="Player One" 
                                onSubmit={(player) => this.handleSubmit('playerOne',player)} 
                            />
                            :<PlayerPreview 
                                username={playerOne} 
                                label='Player One' 
                                onReset={() => this.handleReset('playerOne')}
                            />
                        }

                        {playerTwo === null 
                            ?<PlayerInput 
                                label="Player Two" 
                                onSubmit={(player) => this.handleSubmit('playerTwo',player)} 
                            />
                            :<PlayerPreview 
                                username={playerTwo} 
                                label='Player Two' 
                                onReset={() => this.handleReset('playerTwo')}
                            />
                        }
                    </div>

                    {playerOne && playerTwo && (
                        <button 
                            className="btn dark-btn btn-space button"
                            onClick = {() => this.setState({battle:true})}
                        >
                        Battle
                        </button>
                    )}

                </div>                
            </React.Fragment>
        )
    }
}