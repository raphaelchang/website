import React from 'react';
import $ from 'jquery'; 
import moment from 'moment';

var PageRankPanel = React.createClass({
    getInitialState()
    {
        return {};
    },
    componentDidMount()
    {
        $.getJSON("/api/analytics/page-visit/rank", function( data ) {
            this.setState({pages: data.pages});
        }.bind(this));
    },
    render() {
        let content;
        if (this.state.pages)
        {
            content = (
                    this.state.pages.map(function(page) {
                        return (
                            <tr>
                            <td>{page._id}</td>
                            <td>{page.total}</td>
                            </tr>
                            )
                    })
                );
        }
        return (
        <div className="panel">
        <table>
            <tr>
            <th>Page Slug</th>
            <th>Visits</th> 
            </tr>
            {content}
        </table>
        </div>);
    }
});

module.exports = PageRankPanel;
