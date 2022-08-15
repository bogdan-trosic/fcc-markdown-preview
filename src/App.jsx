import { useState, useEffect } from 'react'
import { marked } from 'marked'
import './App.css'

marked.setOptions({
    gfm: true,
    breaks: true
})

let initialText = '# Markdown Preview App' + '\n\n' + '## a freeCodeCamp project' + '\n\n' + 'Just write on a new line and you have a paragraph. Above you can see how headings are made. You can easily make your text **bold**, add some `inline code` and do all sorts of other things. Please check out the [Markdown Guide](https://www.markdownguide.org/) for reference and see what you can do. Below is some sample code. Happy editing :D' + '\n\n' + '```' + '\n' + 'h1 {' + '\n' + '\tcolor: blue;' + '\n' + '}' + '\n\n' + '.special {' + '\n' + '\tcolor: blue;' + '\n' + '}' + '\n' + '```' + '\n\n' + '- list item n.1' + '\n' + '- list item n.2' + '\n' + '- list item n.3' + '\n\n' + '![A Tangut component in Noto Serif Tangut font](https://upload.wikimedia.org/wikipedia/commons/f/fa/TANGUT_COMPONENT-555.svg)' + '\n\n' + '> “Code is like humor. When you have to explain it, it’s bad” – Cory House'

function App() {
    const [editorText, setEditorText] = useState(initialText)
    const [appMode, setAppMode] = useState('editing')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        document.getElementById('preview').innerHTML = marked.parse(editorText)
    }, [editorText])

    useEffect(() => {
        window.onresize = () => {
            setWindowWidth(window.innerWidth)
        }

        if (windowWidth >= 1280) {
            setAppMode('parallel')
        }

        // preventing forced edit mode on resize;
        // only defaulting to edit if coming from parallel mode;
        if (windowWidth < 1280) {
            setAppMode(prevMode => {
                if (prevMode !== 'parallel') {
                    return prevMode
                } else return 'editing'
            })
        }
    }, [windowWidth])

    function updateText(event) {
        setEditorText(event.target.value)
    }

    function switchModes(event) {
        if (event.target.id === 'edit-button') {
            setAppMode('editing')
        }

        if (event.target.id === 'preview-button') {
            setAppMode('preview')
        }
    }

    return (
        <div className='app'>
            <div className='editor-preview-container'>
                <textarea 
                    id='editor'
                    className='editor' 
                    value={editorText} 
                    onChange={updateText}
                    style={
                        appMode === 'editing' ? 
                            {display: 'block'} : 
                            appMode === 'parallel' ? 
                                {display: 'block'} : 
                                {display: 'none'}}>
                </textarea>
                <div 
                    id='preview' 
                    className='preview' 
                    style={
                        appMode === 'preview' ? 
                            {display: 'block'} : 
                            appMode === 'parallel' ? 
                                {display: 'block'} : 
                                {display: 'none'}}>
                </div>
            </div>
            <div className={`controls ${windowWidth >= 1280 ? 'controls--disabled' : ''}`}>
                <button 
                    id='edit-button'
                    type='button'
                    className={`controls__edit-button ${appMode === 'editing' ? 'control--active' : ''}`} 
                    onClick={switchModes}>
                        <svg 
                            width="19" 
                            height="18" 
                            viewBox="0 0 19 18" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M17.7681 17H11.4078M1 17L5.91479 15.8436L16.6613 5.09708C17.1129 4.64547 17.1129 3.91327 16.6613 3.46165L14.5383 1.33871C14.0868 0.887096 13.3545 0.887096 12.9029 1.33871L2.15642 12.0852L1 17Z" 
                                stroke={appMode === 'editing' ? "#030D1B" : "#D7D0FE"}
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                        Edit
                </button>
                <button 
                    id='preview-button' 
                    type='button'
                    className={`controls__preview-button ${appMode === 'preview' ? 'control--active' : ''}`} 
                    onClick={switchModes}>
                        <svg 
                            width="21" 
                            height="18" 
                            viewBox="0 0 21 18" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M19.56 9C19.56 10.28 17.32 17 10.28 17C3.24 17 1 10.28 1 9C1 7.72 3.24 1 10.28 1C17.32 1 19.56 7.72 19.56 9Z" 
                                stroke={appMode === 'preview' ? "#030D1B" : "#D7D0FE"} 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                            <path 
                                d="M10.28 11.88C11.8706 11.88 13.16 10.5906 13.16 9C13.16 7.40942 11.8706 6.12 10.28 6.12C8.68942 6.12 7.4 7.40942 7.4 9C7.4 10.5906 8.68942 11.88 10.28 11.88Z" 
                                stroke={appMode === 'preview' ? "#030D1B" : "#D7D0FE"} 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                        Preview
                </button>
            </div>
        </div>
    )
}

export default App
