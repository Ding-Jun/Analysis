import React from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import $ from 'jquery'
import {Button, Card, Row, Col,Table,Spin  } from 'antd'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import ChartUtils from '../utils/ChartUtils'
import Chart from './Chart'
class Report extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      report:{
        reportName:"加载中...",
        time:""
      },
      chartInstances:[]
    }
    console.log(this.props.params.id)
    this.queryReport(this.props.params.id);
  }
  componentDidUpdate(){
    if(! this.state.report.reportItems){
      return;
    }
    _.forEach(this.state.report.reportItems,reportItem=>{
      var passchart=reportItem.passChart;
    })

  }
  queryReport(id){

      $.ajax({
        type: 'GET',
        url:'/analysis/rs/report/queryReport/'+id,
        success:function(rm){
          if(rm.code==1){
            console.log("debug",rm.data);
            this.setState({
              report:rm.data,
              loading:false
            })
          }
        }.bind(this)
      })

  }
  doShowReportHead(report){
    var layout={
      xs:24,
      sm:12
    }
    return (
        <Card title="基本信息" bordered={false}
        style={{lineHeight:"250%"}}>
          <Row>
            <Col {...layout}>
              <p>良率: {report.passPercent}</p>
              <p>测试工程师: {report.testMan}</p>
            </Col>
            <Col {...layout} >
              <p>总数: {report.testCount}</p>
              <p>时间: {report.time}</p>
            </Col>
            <Col>
              <p>原始数据文件: {report.srcFile}</p>
            </Col>
          </Row>
        </Card>
      )
  }
  doShowReportPreview(report){
    if(! report.reportItems){
      return null;
    }

    const columns = [{
      title: '测试序号',
      dataIndex: 'testNo'

    },{
      title: '测试项',
      dataIndex: 'columnName'
    },{
      title: '失效数量',
      dataIndex: 'failCount'
    },{
      title: '失效率(%)',
      dataIndex: 'failRate'
    }];
    const osPreview={
      testNo:0,
      columnName:"OPENSHUT",
      failCount:report.osFailCount,
      failRate:report.osFailRate+"%"
    }
    const RANK_LOW=0;
    var data = _.union([osPreview],report.reportItems);
    data = _.forEach(data,function(reportItem){
      var rankCls="";
      if(reportItem.rank==RANK_LOW){
        rankCls="red-text";
      }
      return {
        testNo:reportItem.testNo,
        columnName:reportItem.columnName,
        failCount:<span className={rankCls}>reportItem.failCount</span>,
        failRate:<span className={rankCls}>reportItem.failRate</span>
      };
    })

    return (
        <Card title="测试项预览" bordered={false} >
          <Table ref="table" rowKey="id" columns={columns} dataSource={data} pagination={false}/>
        </Card>
      )
  }
  doShowReportDetail(report){
    if(! report.reportItems){
      return null;
    }
    var reportItemList=report.reportItems.map(reportItem=>(
        <Card key={reportItem.id} title={<span>{reportItem.columnName}<a href="#" disabled> {"#"+reportItem.testNo}</a></span>} bordered={false} >

          {reportItem.passChart?<Chart ref={"chart"+reportItem.passChart.id} {...reportItem.passChart} setChartInstance={this.setChartInstance.bind(this)}/>:null}
          {reportItem.failChart?<Chart ref={"chart"+reportItem.failChart.id} {...reportItem.failChart} setChartInstance={this.setChartInstance.bind(this)}/>:null}
        </Card>
      ));
    return (
      <Card title="测试项详情" bordered={false} >
          {reportItemList}
      </Card>
    )
  }
  setChartInstance(chartRef,instance){
    var chartInstances=this.state.chartInstances;
    chartInstances[chartRef]=instance;
    console.log(chartRef);
   /* this.setState({
      chartInstances:chartInstances
    })*/
  }

  showReport(report){
    var layout={
      xs:24,
      sm:12
    }
    var head=this.doShowReportHead(report);
    var preview=this.doShowReportPreview(report);
    var detail=this.doShowReportDetail(report);
    return (
      <div>
        <h1>{report.reportName}</h1>
        <Spin spinning={this.state.loading}>
        {head}
        {preview}
        {detail}
        </Spin>
      </div>
    )
  }
  test(){
    //this.queryReport(6)
    //ChartUtils.test()
    console.log("test");
    console.log("1",this.state.chartInstances)
    this.downloadReport();
  }
  downloadReport(){
    var report=this.state.report;
    console.log("debug downloadReport report:",report);
    _.map(report.reportItems,(reportItem)=>{
      var passChart =reportItem.passChart;
      var failChart= reportItem.failChart;
      if(passChart!=null){
        passChart.chartImg=this.state.chartInstances["chart"+passChart.id].getDataURL();
      }
      if(failChart!=null){
        failChart.chartImg=this.state.chartInstances["chart"+failChart.id].getDataURL();
      }

    })

    //report.reportItems=[];
    console.log("debug downloadReport report:",report);
    $.ajax({
      type: 'POST',
      url:'/analysis/rs/report/downloadReport',
      data:{
        report:JSON.stringify(this.state.report),
        type:"xml"
      },
      success:function(rm){
        if(rm.code==1){
          console.log("debug downloadReport",rm.data);
          /*this.setState({
            report:rm.data,
            loading:false
          })*/
        }
      }.bind(this)
    })
  }
	render(){

    var report=this.showReport(this.state.report)
		return (
			<div >
        <Button onClick={this.test.bind(this)}/>
        {report}
      </div>
		)
	}
}

export default Report;
