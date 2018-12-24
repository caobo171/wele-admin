import React from 'react';
import { SketchPicker } from 'react-color';
import { pageContainer } from '../../containers/PageContainer-x'
import { SubscribeOne, Subscribe } from 'unstated-x'

class Inspector extends React.Component {

    state = {
        color: pageContainer.state.target && pageContainer.state.target.style.color ? pageContainer.state.target.style.color : null,
        bgColor: pageContainer.state.target && pageContainer.state.target.style.backgroundColor ? pageContainer.state.target.style.backgroundColor : null,
        text: pageContainer.state.target && pageContainer.state.target.innerText ? pageContainer.state.target.innerText : '',
        mode: 'color'
    }

    renderInspector = () => {
        const { mode, text, color } = this.state
        switch (mode) {
            case 'color':
            case 'backgroundColor':
                return (
                    <SketchPicker onChange={(color: any) => {
                        console.log('check', color.hex)
                        pageContainer.state.target.style[mode] = color.hex
                    }} />
                )
            case 'text':
                return (
                    <React.Fragment>
                        {
                            <Subscribe to={[pageContainer]}>
                                {
                                    pageContainer => {
                                        return (
                                            <textarea value={text} onChange={e => {
                                                pageContainer.state.target.innerText = e.target.value
                                                this.setState({ text: e.target.value }, () => {

                                                })
                                            }}></textarea>
                                        )
                                    }
                                }
                            </Subscribe>
                        }
                    </React.Fragment>

                )
        }
    }


    render() {
        return (
            <Subscribe to={[pageContainer]}>
                {pageContainer => {
                    return (
                        <React.Fragment>
                            {pageContainer.state.target && (
                                <React.Fragment>
                                    <h3>Inspector</h3>
                                    <select value={this.state.mode} onChange={e => this.setState({ mode: e.target.value })}>
                                        <option value="color">Color</option>
                                        <option value="backgroundColor">BackgroundColor</option>
                                        <option value="text">Text</option>
                                    </select>

                                    <React.Fragment>
                                        {this.renderInspector()}
                                    </React.Fragment>
                                </React.Fragment>
                            ) }
                        </React.Fragment>
                    )
                }}
            </Subscribe>


        )
    }
}

export default Inspector