var React = require('react');
var ReactDOM = require('react-dom');

import SessionListPanel from './components/SessionListPanel'
import PageRankPanel from './components/PageRankPanel'
import VisitGraphPanel from './components/VisitGraphPanel'

var App = React.createClass({
    render: function() {
        return (
            <div>
            <VisitGraphPanel />
            <SessionListPanel />
            <PageRankPanel />
            </div>
        );
    }
});

ReactDOM.render(
        <App />,
        document.getElementById('react-dom')
);
