import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { LineCharts, LineAdvanceCharts } from '@/components/Charts';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const HomePage: React.FC = () => {
  const { name,welcome } = useModel('global');
  const dateFormat = "YYYY-MM-DD";
  const today = dayjs().format(dateFormat);
  const lastMonth = dayjs().subtract(1, 'month').format(dateFormat);
  const [lastMonthDayJs, setLastMonthDayJs] = useState(dayjs(lastMonth, dateFormat));
  const [todayDayJs, setTodayDayJs] = useState(dayjs(today, dateFormat));
  const [chartData, setchartData] = useState({});

  useEffect(() => {
    getChartDataByDate(lastMonthDayJs, todayDayJs);
  }, [lastMonthDayJs, todayDayJs]);

  const getChartDataByDate = async (startDateDayJs: Dayjs, endDateDayJs: Dayjs) => {
    const startDate = dayjs(startDateDayJs).format(dateFormat);
    const endDate = dayjs(endDateDayJs).format(dateFormat);
    //在这里请求后台数据
    console.log(startDate, endDate);
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
    setchartData(LineAdvanceData);
  }

  const onChange = (async (params: any) => {
    console.log(params);
    setLastMonthDayJs(params[0]);
    setTodayDayJs(params[1]);
  });
  return (
    <PageContainer ghost>
      <Guide name={trim(welcome)} />

      <div>
        请选择时间范围：
      <RangePicker
          defaultValue={[lastMonthDayJs, todayDayJs]}
          format={dateFormat}
          onChange={(val) => onChange(val)}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <LineAdvanceCharts data={chartData} />
        <LineAdvanceCharts data={chartData} />
      </div>
      <div style={{ display: 'flex' }}>
        <LineAdvanceCharts data={chartData} />
      </div>
    </PageContainer>

  );
};

export default HomePage;
