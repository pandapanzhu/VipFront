import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { LineCharts, LineAdvanceCharts } from '@/components/Charts';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import services from '@/services/statistics';

const { queryPersonStatistics, queryChargeStatistics } =
  services.StatisticsController;

const { RangePicker } = DatePicker;

const HomePage: React.FC = () => {
  const { name, welcome } = useModel('global');
  const dateFormat = 'YYYY-MM-DD';
  const today = dayjs().format(dateFormat);
  const lastMonth = dayjs().subtract(1, 'month').format(dateFormat);
  const [lastMonthDayJs, setLastMonthDayJs] = useState(
    dayjs(lastMonth, dateFormat),
  );
  const [todayDayJs, setTodayDayJs] = useState(dayjs(today, dateFormat));
  const [personChartData, setPersonChartData] = useState({});
  const [chargeChartData, setChargeChartData] = useState({});

  useEffect(() => {
    getChartDataByDate(lastMonthDayJs, todayDayJs);
  }, [lastMonthDayJs, todayDayJs]);

  const getChartDataByDate = async (
    startDateDayJs: Dayjs,
    endDateDayJs: Dayjs,
  ) => {
    const startDate = dayjs(startDateDayJs).format(dateFormat);
    const endDate = dayjs(endDateDayJs).format(dateFormat);
    //在这里请求后台数据
    console.log(startDate, endDate);

    try {
      const personData = await queryPersonStatistics({ startDate, endDate });
      if (200 == personData?.code) {
        setPersonChartData(personData.data);
      }
      const chargeData = await queryChargeStatistics({ startDate, endDate });
      if (200 == chargeData?.code) {
        setChargeChartData(chargeData.data);
      }
    } catch {
      return false;
    }
  };

  const onChange = async (params: any) => {
    console.log(params);
    setLastMonthDayJs(params[0]);
    setTodayDayJs(params[1]);
  };
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
        <LineAdvanceCharts data={personChartData} />
        <LineAdvanceCharts data={chargeChartData} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
