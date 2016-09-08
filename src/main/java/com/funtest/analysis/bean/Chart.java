package com.funtest.analysis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="t_chart")
public class Chart {
	private Integer id;
	private String title;
	private String datas="";
	private Double realMax;
	private Double realMin;
	private Double realAverage;
	private Integer groupCnt=500;			//分组数  
	private Double limitMin;
	private Double limitMax;
	private Double rangeMin;
	private Double rangeMax;
	private Double sigma;
	private Integer totalCnt=0;				//该测试项Pass/Fail总颗数   即样本数
	private Integer quantityMax=0;			//数量最多的柱子
	private Double cpk;
	private Double cpu;
	private Double cpi;
	private Double cp;
	private String chartImg="no img";	//fomat:base64
	private Integer chartType;
	private Boolean visible;
	private Boolean isDeleted;
	public Chart(){
		
	}

	@Column(name="id")
	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}

	@Column(length=65535)
	public String getDatas() {
		return datas;
	}
	
	
	public void setDatas(String datas) {
		this.datas = datas;
	}
	
	@Column
	public Double getRealMax() {
		return realMax;
	}
	public void setRealMax(Double realMax) {
		this.realMax = realMax;
	}
	
	@Column
	public Double getRealMin() {
		return realMin;
	}
	public void setRealMin(Double realMin) {
		this.realMin = realMin;
	}
	
	@Column
	public Integer getGroupCnt() {
		return groupCnt;
	}
	public void setGroupCnt(Integer groupCnt) {
		this.groupCnt = groupCnt;
	}
	
	@Column
	public Double getLimitMin() {
		return limitMin;
	}
	public void setLimitMin(Double limitMin) {
		this.limitMin = limitMin;
	}
	
	@Column
	public Double getLimitMax() {
		return limitMax;
	}
	public void setLimitMax(Double limitMax) {
		this.limitMax = limitMax;
	}
	
	@Column
	public Double getRangeMin() {
		return rangeMin;
	}

	public void setRangeMin(Double rangeMin) {
		this.rangeMin = rangeMin;
	}
	
	@Column
	public Double getRangeMax() {
		return rangeMax;
	}

	public void setRangeMax(Double rangeMax) {
		this.rangeMax = rangeMax;
	}


	@Column
	public Double getRealAverage() {
		return realAverage;
	}
	public void setRealAverage(Double realAverage) {
		this.realAverage = realAverage;
	}
	
	@Column
	public Integer getQuantityMax() {
		return quantityMax;
	}
	public void setQuantityMax(Integer quantityMax) {
		this.quantityMax = quantityMax;
	}
	
	@Column
	public Double getSigma() {
		return sigma;
	}
	public void setSigma(Double sigma) {
		this.sigma = sigma;
	}
	
	@Column
	public Integer getChartType() {
		return chartType;
	}
	public void setChartType(Integer chartType) {
		this.chartType = chartType;
	}
	@Column
	public Integer getTotalCnt() {
		return totalCnt;
	}

	public void setTotalCnt(Integer totalCnt) {
		this.totalCnt = totalCnt;
	}
	@Column
	public Double getCpk() {
		return cpk;
	}

	public void setCpk(Double cpk) {
		this.cpk = cpk;
	}
	@Column
	public Double getCpu() {
		return cpu;
	}

	public void setCpu(Double cpu) {
		this.cpu = cpu;
	}

	@Column
	public Double getCpi() {
		return cpi;
	}

	public void setCpi(Double cpi) {
		this.cpi = cpi;
	}

	@Column
	public Double getCp() {
		return cp;
	}

	public void setCp(Double cp) {
		this.cp = cp;
	}

	@Column(length=655350)
	public String getChartImg() {
		return chartImg;
	}

	public void setChartImg(String chartImg) {
		this.chartImg = chartImg;
	}
	
	@Column
	public Boolean getVisible() {
		return visible;
	}

	public void setVisible(Boolean visible) {
		this.visible = visible;
	}

	@Column
	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	/**
	 * 设置数据范围
	 * @param rangeMin
	 * @param rangeMax
	 */
	public void setLimit(Double limitMin,Double limitMax){
		//swap
		if(limitMin> limitMax){
			Double temp=limitMin;
			limitMin=limitMax;
			limitMax=temp;
		}
		this.limitMax=limitMax;
		this.limitMin=limitMin;
	}
	

	
}