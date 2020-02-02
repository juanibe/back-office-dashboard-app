import React, { Component } from "react";
import { Chart } from 'react-charts'


function ReactChart(props) {
  console.log(props)
  const earnings = props.data.map(earnings => { return earnings.price })
  const eventsNumber = props.data.map(events => { return events.count })
  let eventsNumberArray = []
  let earningsArray = []
  eventsNumber.map((eventsNumber, index) => {
    return eventsNumberArray.push([index, eventsNumber])
  })
  earnings.map((earnings, index) => {
    return earningsArray.push([index, earnings])
  })

  const data =
    [
      // {
      //   label: 'Events',
      //   data: eventsNumberArray
      // },
      {
        label: 'Earnings',
        data: earningsArray
      }
    ]

  const axes =
    [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ]

  // const data = React.useMemo(
  //   () => [
  //     {
  //       label: 'Series 1',
  //       data: array
  //     }
  //   ],
  //   []
  // )

  // const axes = React.useMemo(
  //   () => [
  //     { primary: true, type: 'linear', position: 'bottom' },
  //     { type: 'linear', position: 'left' }
  //   ],
  //   []
  // )

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
        margin: '20px 0 80px 0'
      }}
    >
      <h4>{props.title}</h4>
      <Chart data={data} axes={axes} />
    </div>
  )
}

export default ReactChart;