import ReactDOM from 'react-dom';
import React from 'react';
import { Chart, Axis, Tooltip, Line, LineAdvance, Point } from "bizcharts";


interface Props {
	type: string;
}

// 数据源
const LineAdvanceData = [
	{
		type: '充值人数',
		topUp: 36,
		date: "2023-03-01"
	},
	{
		type: '消费人数',
		topUp: 36,
		date: "2023-03-01"
	},
	{
		type: '充值人数',
		topUp: 136,
		date: "2023-03-02"
	},
	{
		type: '消费人数',
		topUp: 306,
		date: "2023-03-02"
	},
	{
		type: '充值人数',
		topUp: 360,
		date: "2023-03-03"
	},
	{
		type: '消费人数',
		topUp: 3,
		date: "2023-03-03"
	},
	{
		type: '充值人数',
		topUp: 306,
		date: "2023-03-04"
	},
	{
		type: '消费人数',
		topUp: 0,
		date: "2023-03-04"
	},
	{
		type: '充值人数',
		topUp: 30,
		date: "2023-03-05"
	},
	{
		type: '消费人数',
		topUp: 3600,
		date: "2023-03-05"
	},
	{
		type: '充值人数',
		topUp: 315,
		date: "2023-03-10"
	},
	{
		type: '消费人数',
		topUp: 360,
		date: "2023-03-11"
	},
	{
		type: '消费人数',
		topUp: 3006,
		date: "2023-03-12"
	},
	{
		type: '消费人数',
		topUp: 3600,
		date: "2023-03-13"
	}
];

// 数据源
const Linedata = [
	{
		year: "1991",
		value: 3,
	},
	{
		year: "1992",
		value: 4,
	},
	{
		year: "1993",
		value: 3.5,
	},
	{
		year: "1994",
		value: 5,
	},
	{
		year: "1995",
		value: 4.9,
	},
	{
		year: "1996",
		value: 6,
	},
	{
		year: "1997",
		value: 7,
	},
	{
		year: "1998",
		value: 9,
	},
	{
		year: "1999",
		value: 13,
	},
];

// 脚手架示例组件
const Charts: React.FC<Props> = (props) => {
	const type = props.type;
	if (type == 'PersonLineAdvance') {
		return (
				<Chart padding={[10, 20, 50, 40]} autoFit height={300} data={LineAdvanceData} >
					<LineAdvance
						shape="smooth"
						point
						area
						position="date*topUp"
						color="type"
					/>
				</Chart>

		);
	} else if (type == 'ChargeLineAdvance')  {
		return (
			<Chart padding={[10, 20, 50, 40]} autoFit height={300} data={LineAdvanceData} >
			<LineAdvance
				shape="smooth"
				point
				area
				position="date*topUp"
				color="type"
			/>
		</Chart>
		);
	} else {
		return (
				<Chart
					appendPadding={[10, 0, 0, 10]}
					autoFit
					height={300}
					data={Linedata}
					scale={{ value: { min: 0, alias: '人均年收入', type: 'linear-strict' }, year: { range: [0, 1] } }}
				>

					<Line position="year*value" />
					<Point position="year*value" />
					<Tooltip showCrosshairs follow={false} />
				</Chart>
		);
	}
	return null;

};

export default Charts;

