import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
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

const data = [
  createData(1612202226, 725, 800),
  createData(1612288626, 650, 750),
  createData(1612375026, 444, 689),
  createData(1612461426, 300, 615),
  createData(1612547826, undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Plant Moisture Dashboard</Title>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
          <Label
              position="center"
              offset={10}
              style={{
                textAnchor: 'middle', // working here need to get the "Day" to be below the data
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Day
            </Label>
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
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
