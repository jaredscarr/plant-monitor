import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label, CartesianGrid, ResponsiveContainer } from 'recharts';
import Title from './Title';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function createData(ts, pl_one_level, pl_two_level) {
  let date = getDayFromTimestamp(ts);
  let graph_data = {
    'date': date,
    'plant_one': pl_two_level,
    'plant_two': pl_one_level,
  };
  return graph_data;
}

function getDayFromTimestamp(unix_ts) {
  return new Date(unix_ts * 1000).getDate();
}

export default function Chart() {
  const theme = useTheme();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    fetch(new URL(`${REACT_APP_API_BASE_URL}/readings`),
      {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then(res => res.json())
    .then(
      (result) => {
        const data = result.map(obj =>
          createData(
            obj['reported']['utc_timestamp'],
            Number(obj['reported']['plant_one']),
            Number(obj['reported']['plant_two'])
          )
        );
        setReadings(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }, []);


  return (
    <React.Fragment>
      <Title>Plant Moisture Dashboard</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={readings}
          margin={{
            top: 16,
            right: 30,
            bottom: 20,
            left: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            label={{ value: 'Day', position: 'insideBottomRight', offset: -10 }}
          >
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Moisture (ADC)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="plant_one"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="plant_two"
            stroke={theme.palette.primary.secondary}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
