import React from 'react';
import $ from 'jquery'; 
import moment from 'moment';

var SessionListPanel = React.createClass({
    getInitialState()
    {
        return {};
    },
    componentDidMount()
    {
        $.getJSON("/api/analytics/session/list", function( data ) {
            this.setState({sessions: data.sessions});
            this.state.sessions.forEach(function(element, index)
                {
                    $.getJSON("http://ip-api.com/json/" + element.ip, function(data) {
                        this.state.sessions[index].location_data = (data.country == "United States" ? data.city + ", " + data.region : data.city + ", " + data.country);
                        this.setState({sessions: this.state.sessions});
                    }.bind(this));
                }.bind(this));
        }.bind(this));
    },
    render() {
        let content;
        if (this.state.sessions)
        {
            content = (
                    this.state.sessions.map(function(session) {
                        return (
                            <tr>
                            <td>{session.ip}</td>
                            <td>{moment(session.time).format("MM/DD/YYYY H:mm:ss")}</td>
                            <td>{session.visitCount}</td>
                            <td>{session.location_data}</td>
                            </tr>
                            )
                    })
                );
        }
        return (
        <div className="panel">
        <table>
            <tr>
            <th>IP Address</th>
            <th>Timestamp</th> 
            <th>Pages Visited</th>
            <th>Location</th>
            </tr>
            {content}
        </table>
        </div>);
    }
});

module.exports = SessionListPanel;
