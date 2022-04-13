import React, {useState, useEffect} from 'react'
import './statistics.css'

function Statistics(props) {

  const excelData = props.excelData

  //총매출액, 영업이익금액, 당기순이익금액
  let sum2021revenue = 0
  let sum2022revenue = 0
  let sum2021operating = 0
  let sum2022operating = 0
  let sum2021net = 0
  let sum2022net = 0
  
  excelData.forEach(value => {
    if (value.closingMonth.indexOf('2021') === 0) {
      sum2021revenue += Number(value.revenue)
      sum2021operating += Number(value.operatingIncome)
      sum2021net += Number(value.netIncome)
    }
    else if (value.closingMonth.indexOf('2022') === 0){
      sum2022revenue += Number(value.revenue)
      sum2022operating += Number(value.operatingIncome)
      sum2022net += Number(value.netIncome)
    }
  })
  //회사 수(중복제거)
  const reduceDupli = []
  excelData.forEach(value => {
    if (!reduceDupli.includes(value.companyCode)){
      reduceDupli.push(value.companyCode)
    }
  })
  const numberOfCompany=reduceDupli.length
  
  //매출액 평균
  let avg2021revenue = (sum2021revenue/numberOfCompany).toFixed(2)
  let avg2022revenue = (sum2022revenue/numberOfCompany).toFixed(2)

  const totalYear = [
    {
      year: "2021",
      totalRevenue: sum2021revenue,
      avrRevenue: avg2021revenue,
      operating: sum2021operating,
      net: sum2021net
    },
    {
      year: "2022",
      totalRevenue: sum2022revenue,
      avrRevenue: avg2022revenue,
      operating: sum2022operating,
      net: sum2022net
    }
  ]
  

  return (
    <div className='statistics'>
      &emsp;
      <input type='radio'/>년
      &emsp;
      <input type='radio'/>월
      &emsp;
      <input type='radio'/>4분기
      &emsp;
      <input type='radio'/>반기
      <table className='statisticsExcelDatasTable'>
          <thead className='statisticsExcelDataThead'>
            <tr>
              <th scope='col'>기준</th>
              <th scope='col'>총매출</th>
              <th scope='col'>평균매출액</th>
              <th scope='col'>영업이익금액</th>
              <th scope='col'>당기순이익금액</th>
            </tr>
          </thead>
          <tbody>
            {totalYear.map(data=>
              <tr key={data.year}>
                <td scope='row' className='statisticsExcelDataTbody'>{data.year}</td>
                <td className='statisticsExcelDataTbody'>{data.totalRevenue}</td>
                <td className='statisticsExcelDataTbody'>{data.avrRevenue}</td>
                <td className='statisticsExcelDataTbody'>{data.operating}</td>
                <td className='statisticsExcelDataTbody'>{data.net}</td>
              </tr>
            )}
          </tbody>
        </table>
        
    </div>
  )
}

export default Statistics
