import React from 'react'
import PropTypes from 'prop-types'

import { fetchPopularRepos } from '../utils/api'

function LangaugesNav({selected, onUpdateLanguage}){
    const languages = ['All','JavaScript','Ruby','Java','CSS,','Python']

    return(
        <ul className='flex-center'>
            {languages.map((language,index) =>(
                <li key={index}>
                    <button 
                        className='btn-clear nav-link' 
                        onClick = {() => onUpdateLanguage(language)}
                        style={language === selected ? { color: 'rgb(187,46,31'} : null}
                    >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LangaugesNav.popTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}

export default class Popular extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: null,
            error: null
        }

        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
        
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error: null,
            repos:null
        })

        fetchPopularRepos(selectedLanguage)
            .then((repos) => this.setState({
                repos,
                error: null,
            }))
            .catch(() =>{
                console.warn('Error fetcing repos', error)

                this.setState({
                    error : `There was an error fetcing the repositories.`
                })
            })
    }
    
    isLoading(){
        return this.state.repos === null && this.state.error === null;
    }


    render(){
        const { selectedLanguage, repos, error } = this.state

        return(
            <React.Fragment>
                <LangaugesNav 
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                {this.isLoading() && <p>LOADING</p>} 

                {error && <p>{error}</p>}

                {repos && <pre>{JSON.stringify(repos,null,2)}</pre>}
            </React.Fragment>
        )
    }
}