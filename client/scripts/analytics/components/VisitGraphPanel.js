import React from 'react';
import $ from 'jquery'; 
import moment from 'moment';
import {Line} from 'react-chartjs-2';

var VisitGraphPanel = React.createClass({
    getInitialState()
    {
        return {};
    },
    componentDidMount()
    {
        var currentMonth = moment(new Date()).format('M');
        var currentYear = moment(new Date()).format('YYYY');
        $.getJSON("/api/analytics/session/list", function( data ) {
            var visitCounts = {};
            var viewCounts = {};
            var ipMap = {};
            for (var i = 0; i < data.sessions.length; i++)
            {
                if (moment(data.sessions[i].time).format('M') == currentMonth && moment(data.sessions[i].time).format('YYYY') == currentYear)
                {
                    if (visitCounts[moment(data.sessions[i].time).format('D')] == undefined)
                    {
                        visitCounts[moment(data.sessions[i].time).format('D')] = 1;
                        viewCounts[moment(data.sessions[i].time).format('D')] = data.sessions[i].visitCount;
                        ipMap[moment(data.sessions[i].time).format('D')] = {};
                        ipMap[moment(data.sessions[i].time).format('D')][data.sessions[i].ip] = 1;
                    }
                    else
                    {
                        visitCounts[moment(data.sessions[i].time).format('D')]++;
                        viewCounts[moment(data.sessions[i].time).format('D')] += data.sessions[i].visitCount;
                        ipMap[moment(data.sessions[i].time).format('D')][data.sessions[i].ip] = 1;
                    }
                }
                else
                    break;
            }
            var visitCount = [];
            var viewCount = [];
            var ipCount = [];
            for (var i = 1; i <= moment(new Date()).format('D'); i++)
            {
                visitCount.push(visitCounts[i] == undefined ? 0 : visitCounts[i]);
                viewCount.push(viewCounts[i] == undefined ? 0 : viewCounts[i]);
                ipCount.push(ipMap[i] == undefined ? 0 : Object.keys(ipMap[i]).length);
            }
            this.setState({visitCounts: visitCount, viewCounts: viewCount, ipCounts: ipCount});
        }.bind(this));
    },
    render() {
        var labels = [];
        for (var i = 1; i <= moment().daysInMonth(); i++) {
               labels.push(moment.monthsShort()[moment(new Date()).format('M') - 1] + " " + i);
        }
        var dataset = {
            labels: labels,
            datasets: [{
                label: 'Visit Count',
                fill: false,
                lineTension: 0.1,
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.visitCounts,
                spanGaps: false,
            }, {
                label: 'View Count',
                fill: false,
                lineTension: 0.1,
                borderColor: "rgba(75,180,250,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,180,250,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,180,250,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.viewCounts,
                spanGaps: false,
            }, {
                label: 'Unique Visitors',
                fill: false,
                lineTension: 0.1,
                borderColor: "rgba(180,75,75,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointborderColor: "rgba(180,75,75,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(180,75,75,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.ipCounts,
                spanGaps: false,
            }]
        };
        return (
        <div className="panel">
        <Line data={dataset} />
        </div>);
    }
});

module.exports = VisitGraphPanel;
