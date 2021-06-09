import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'

import Header from '../components/Header'

const SITE_TITLE = ''

class MainContainer extends Component {

    state = {
    }

    componentDidMount() {

    }


    render() {
        const { updateTime, children, title } = this.props

        return (
            <Sidebar.Pushable>
                <Helmet>
                    <title>{title !== undefined ? `${title} - ${SITE_TITLE}` : SITE_TITLE}</title>
                </Helmet>
                <Header
                    updateTime={updateTime}
                    onUpdateData={() => this.updateWeatherData()}
                    onClickMenu={() => this.setVisible(true)}
                />
                {children}
            </Sidebar.Pushable>
        )
    }
}

function mapStateToProps(state) {
    return {
        storeSummary: state.meteostation.storeSummary
    }
}

export default connect(mapStateToProps)(MainContainer)