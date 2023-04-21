import React from 'react';
import { Chart, LineAdvance } from "bizcharts";

interface Props {
	data: {};
}

// 脚手架示例组件
const Charts: React.FC<Props> = (props) => {
	const data = props.data;
	return (
		<Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data} >
			<LineAdvance
				shape="smooth"
				point
				area
				position="date*num"
				color="type"
				label="aaaa"
			/>
		</Chart>

	);
};

export default Charts;

